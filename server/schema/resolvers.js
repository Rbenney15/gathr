const { AuthenticationError } = require('apollo-server-express');
const { User, Event, Attendee, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // type Query {
    //   me: User
    //   users: [User]
    //   user(username: String!): User
    //   events(username: String): [Event]
    //   event(_id: ID!): Event
    // }
    me: 
      async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('events');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('events');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('events');
    },
    events: async (parent, { username }) => {
      const params = username? { username } : {};
      return Event.find(params)
        .sort({ createdAt: -1 })
        .populate('items')
        .populate('attendees');
    },
    event: async (parent, { _id }) => {
      return Event.findOne({ _id })
        .populate('items')
        .populate({
          path: 'attendees',
          populate: {
            path: 'items',
            model: 'Item'
          }
        });
    }
  },
  

  Mutation: {
    // type Mutation {
    //   login(email: String!, password: String!): Auth
    //   addUser(username: String!, email: String!, password: String!): Auth
    //   addEvent(name: String!, date: String!, description: String!): Event
    //   sendRSVP(eventId: ID!, nickname: String!, comment: String, items: String): Event
    // }
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect login information');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect login information');
      }

      const token = signToken(user);
      return { token, user };
    },
    addEvent: async (parent, args, context) => {
      if (context.user) {
        // Create Event object
        const event = await Event.create({ ...args,
          host: context.user._id,
          items: [] });

        // Retrieve csv from items field of form
        const { items } = args;
        
        // Separate into a [String]
        const itemArray = items.split(",").map(element => element.trim());

        // Transform each of those into Item with _id & name
        for (let item of itemArray) {
          // Create Item object
          const newItem = await Item.create({ 
            name: item,
            eventId: event._id
          });
          event.items.push(newItem);
        }

        await event.save();

        // Push new Event to logged-in User's list of events
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { events: event._id } },
          { new: true }
        );

        return event;
      }

      throw new AuthenticationError('You must be logged in to create an event');
    },
    sendRSVP: async (parent, { eventId, nickname, comment, items }) => {
      // create a new Attendee
      const newAttendee = await Attendee.create({ 
        nickname: nickname, comment: comment,
        eventId: eventId,
        items: [] });
        

      if (items) {
        // Retrieve csv from items field of form and split:
        const itemArray = items.split(",").map(element => element.trim());
        
        // Update Item's broughtBy field and add to new Attendee's items
        for (let itemString of itemArray) {
          const item = await Item.findOne({ eventId, name: itemString });
          if (!item) continue;

          // Update Item's broughtBy
          item.broughtBy = newAttendee._id;
          await item.save();
          
          // Add to Attendee's items
          newAttendee.items.push(item);
          // Future: only push if the item is not present (i.e. don't push duplicates)
        }

        await newAttendee.save();
      }

      // push new Attendee to Event's attendees
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId }, // eventId from form submission
        { $push: { attendees: newAttendee } }, // <-- change this
        { new: true, runValidators: true }
      );

      return updatedEvent;
    },
    deleteEvent: async (parent, { _id }, context) => {
      // Logged-in User only <-- then add authentication for User == host
      if (context.user) {
        // Find Event and delete
        await Event.findByIdAndDelete(_id);

        // Remove Attendees & Items
        await Attendee.deleteMany({ eventId: _id });
        await Item.deleteMany({ eventId: _id });
      }
    },
    updateEvent: async (parent, {_id, name, date, description}, context) => {
      if (context.user) {
        let updateQuery = {};

        if (name) updateQuery = { ...updateQuery, name };
        if (date) updateQuery = { ...updateQuery, date };
        if (description) updateQuery = { ...updateQuery, description };

        const updatedEvent = await Event.findByIdAndUpdate(
          _id,
          { $set: updateQuery },
          { new: true });

        return updatedEvent;
      }

      throw new AuthenticationError('You must be logged in to edit an event');
    }
  }
  
};

module.exports = resolvers;

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
        .populate('attendees');
    }
    // ...
  },
  

  Mutation: {
    // type Mutation {
    //   login(email: String!, password: String!): Auth
    //   addUser(username: String!, email: String!, password: String!): Auth
    //   addEvent(name: String!, date: String!, description: String!): Event
    //   addItem(eventId: ID!, name: String!): Event
    //   addAttendee(eventId: ID!, nickname: String!, attending: Boolean!): Event
    //   claimItem(eventId: ID!, itemId: ID!, attendeeId: ID!): Event
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
        // Retrieve csv from items field of form
        const { items } = args;
        
        // Separate into a [String]
        const itemArray = items.split(",").map(element => element.trim());

        // Transform each of those into Item with _id & name
        const newItems = [];
        for (let item of itemArray) {
          // Create Item object
          const newItem = await Item.create({ name: item });
          newItems.push(newItem);
        }

        const event = await Event.create({ ...args,
          host: context.user._id,
          items: newItems });
                  
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
      // prepare items:
      const itemStrings = [];
      // assume incoming items parameter is a csv string
      if (items && items.length > 0)
        itemStrings.push(items.split());
      
      const updatedItems = [];
      // for each
      for (let itemString of itemStrings) {
        const item = await Item.findOne({ name: itemString });

        updatedItems.push(item);
      }
      
      // create a new Attendee
      const newAttendee = await Attendee.create({ 
        nickname: nickname, comment: comment,
        items: updatedItems });
        
      // Update Item broughtBy field with new Attendee's _id
      for (let item of updatedItems) {
        item.set({ broughtBy: newAttendee._id });
      }

      // push new Attendee to Event's attendees
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId }, // eventId from form submission
        { $push: { attendees: newAttendee } }, // <-- change this
        { new: true, runValidators: true }
      );

      return updatedEvent;
    },
    deleteEvent: async (parent, { eventId }, context) => {
      // Logged-in User only <-- then add authentication for User == host
      if (context.user) {
        // Find Event and delete
        const {err, deletedEvent} = await Event.findByIdAndDelete(eventId);

        if (err) {
          console.err(err);
          return false;
        }

        // Remove Attendees & Items
        await Attendee.deleteMany({ eventId });
        await Item.deleteMany({ eventId });

        return true;
      }
    }
  }
  
};

module.exports = resolvers;

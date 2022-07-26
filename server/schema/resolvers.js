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

    me: async () => {
      async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('events');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      }
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
        //test progress: const newItems = itemArray.join("+");
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
    // addItem: async (parent, { eventId, itemName }, context) => {
    //   if (context.user) 
    //   {
    //     const updatedEvent = await Event.findOneAndUpdate(
    //       { _id: eventId },
    //       { $push: { items: { name: itemName } } },
    //       { new: true, runValidators: true }
    //     );

    //     return updatedEvent;
    //   }

    //   throw new AuthenticationError('You must be logged in to assign an item to an event');
    // },
    sendRSVP: async (parent, { eventId, attendeeNickname, itemString }) => {
      // if invite authentication passes
      {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $push: { attendees: { nickname: attendeeNickname, attending } } },
          { new: true, runValidators: true }
        );

        return updatedEvent;
      }

      // throw new AuthenticationError('You must be logged in to rsvp an attendee to an event');
    },
    // claimItem: async (parent, { eventId, itemId, attendeeId }) => {
    //   // if invite authentication passes
    //   {
    //     const updatedEvent = await Event.findOneAndUpdate(
    //       { _id: eventId },
    //     )
    //   }
    // }
  }
  
};

module.exports = resolvers;

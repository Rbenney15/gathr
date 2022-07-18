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

    },
    users: async () => {

    },
    // ...
  },
  

  Mutation: {
    // type Mutation {
    //   login(email: String!, password: String!): Auth
    //   addUser(username: String!, email: String!, password: String!): Auth
    //   addEvent(name: String!, date: String!, description: String!): Event
    //   addItem(eventId: ID!, name: String!): Event
    //   addAttendee(eventId: ID!, nickname: String!, attending: Boolean!): Attendee
    // }


  }
  
};

module.exports = resolvers;

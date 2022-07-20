const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    events: [Event]
    eventCount: Int
  }

  type Event {
    _id: ID
    host: String
    name: String
    date: String
    completed: Boolean
    description: String
    items: [Item]
    attendees: [Attendee]
    attendeeCount: Int
    hasEverything: Boolean
  }

  type Item {
    _id: ID
    name: String
    broughtBy: String
    claimed: Boolean
  }

  type Attendee {
    _id: ID
    nickname: String
    respondedAt: String
    attending: Boolean
    items: [Item]
    bringingSomething: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(_id: ID!): Event
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(name: String!, date: String!, description: String!): Event
    addItem(eventId: ID!, name: String!): Event
    addAttendee(eventId: ID!, nickname: String!, attending: Boolean!): Event
    claimItem(eventId: ID!, itemId: ID!, attendeeId: ID!): Event
  }
`;

module.exports = typeDefs;
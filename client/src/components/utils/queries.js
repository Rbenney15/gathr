import { gql } from '@apollo/client';

export const QUERY_EVENTS = gql`
  query events($username: String) {
    events(username: $username) {
      _id
      name
      date
      attendeeCount
      completed
      }
    }
`;

export const QUERY_EVENT = gql`
  query event($id: ID!) {
    event(_id: $id) {
        _id
      name
      description
      date
      items {
        _id
        name
        broughtBy
      }
      attendeeCount
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      eventCount
      events {
        _id
        name
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      eventCount
      events {
        _id
        name
      }
    }
  }
`;
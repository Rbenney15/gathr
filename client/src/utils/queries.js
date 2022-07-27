import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      events {
        _id
        name
        date
        description
        items {
          _id
          name
        }
        hasEverything
        attendeeCount
        attendees {
          _id
          nickname
        }
      }
    }
  }`;

export const QUERY_EVENTS_DASHBOARD = gql`
  query events($username: String) {
    events(username: $username) {
      _id
      name
      date
      attendeeCount
    }
  }
`;

export const QUERY_EVENT_DETAILS = gql`
  query event($id: ID!) {
    event(_id: $id) {
      _id
      name
      date
      description
      # items {
      #   _id
      #   name
      #   broughtBy
      # }
      # attendees {
      #   _id
      #   nickname
      #   comment
      #   items {
      #     _id
      #     name
      #   }
      # }
    }
  }
`;

export const QUERY_EVENT_UPDATE = gql`
  query event($id: ID!) {
    event(_id: $id) {
      _id
      name
      date
      description
    }
  }
`;

export const QUERY_EVENT_RSVP = gql`
  query event($id: ID!) {
    event(_id: $id) {
      _id
      name
      items {
        _id
        name
        broughtBy
      }
    }
  }
`;
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($name: String!, $date: String!, $description: String!, $items: String) {
    addEvent(name: $name, date: $date, description: $description, items: $items) {
      _id
      host
      name
      date
      description
      items {
        _id
        name
      }  
    }
  }
`;

export const SEND_RSVP = gql`
  mutation sendRSVP($eventId: ID!, $nickname: String!, $comment: String, $items: String) {
    sendRSVP(eventId: $eventId, nickname: $nickname, comment: $comment, items: $items) {
      _id
      attendees {
        _id
        nickname
        comment
        items {
          _id
          name
        }
      }
    }
  }
`;

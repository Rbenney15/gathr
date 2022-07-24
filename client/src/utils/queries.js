import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
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

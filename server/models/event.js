const { Schema, model } = require('mongoose');
const itemSchema = require('./Item');
const Attendee = require('./Attendee');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
  {
  // type Event {
  //   _id: ID
  //   host: String
  //   name: String
  //   date: String
  //   completed: Boolean
  //   description: String
  //   items: [Item]
  //   attendees: [Attendee]
  //   attendeeCount: Int
  //   hasEverything: Boolean
  // }
    name: {
      type: String,
      required: 'Your event must have a name!',
      minlength: 1,
      maxlength: 120
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      // ...
    }
  }
);


const Event = model('Event', eventSchema);

module.exports = Event;

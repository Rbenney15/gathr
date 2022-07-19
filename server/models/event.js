const { Schema, model } = require('mongoose');
const itemSchema = require('./Item');
const attendeeSchema = require('./Attendee');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
  {
    // type Event {
    //   _id: ID
    //   host: String
    //   name: String
    //   date: String
    //   (v) completed: Boolean
    //   description: String
    //   items: [Item]
    //   attendees: [Attendee]
    //   (v) attendeeCount: Int
    //   (v) hasEverything: Boolean
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
      type: Date,
      get: timestamp => dateFormat(timestamp)
    },
    description: {
      type: String,
      required: 'Your event must have a description, such as event location and theme!',
      maxlength: 480
    },
    items: [itemSchema],
    attendees: [attendeeSchema]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

eventSchema.virtual('completed').get(function() {
  // return event date before current date
});
eventSchema.virtual('attendees').get(function() {
  return this.attendees.length;
});
eventSchema.virtual('hasEverything').get(function() {
  // if foreach item claimed is true, return true
});





const Event = model('Event', eventSchema);

module.exports = Event;

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
  {
    // type Event {
    //   _id: ID
    //   host: String
    //   name: String
    //   date: String
    //   (v) rawDate: String
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
    timestamp: {
      type: String
    },
    description: {
      type: String,
      required: 'Your event must have a description, such as event location and theme!',
      maxlength: 480
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ],
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attendee'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

eventSchema.virtual('date').get(function() {
  return dateFormat(this.timestamp);
})
eventSchema.virtual('completed').get(function() {
  // return event date before current date
});
eventSchema.virtual('attendeeCount').get(function() {
  return this.attendees.length;
});
eventSchema.virtual('hasEverything').get(function() {
  // if foreach item claimed is true, return true
  return true;
});


const Event = model('Event', eventSchema);

module.exports = Event;

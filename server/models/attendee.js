const { Schema } = require('mongoose');
const itemSchema = require('./Item');
const dateFormat = require('../utils/dateFormat');

const attendeeSchema = new Schema(
  {
    // type Attendee {
    //   _id: ID
    //   nickname: String
    //   respondedAt: String
    //   attending: Boolean
    //   items: [Item]
    //   (v) bringingSomething: Boolean
    // }
    nickname: {
      type: String,
      required: 'Let the host know who you are!',
      minlength: 2,
      maxlength: 24
    },
    respondedAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    attending: {
      type: Boolean
    },
    items: [itemSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

attendeeSchema.virtual('bringingSomething').get(function() {
  return this.items.length > 0;
});

module.exports = attendeeSchema;

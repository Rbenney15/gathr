const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const attendeeSchema = new Schema(
  {
    // type Attendee {
    //   _id: ID
    //   nickname: String
    //   respondedAt: String
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
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
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

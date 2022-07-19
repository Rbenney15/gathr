const { Schema } = require('mongoose');
const attendeeSchema = require('./Attendee');

const itemSchema = new Schema(
  {
    // type Item {
    //   _id: ID
    //   name: String
    //   broughtBy: Strings
    //   claimed: Boolean
    // }
    name: {
      type: String,
      required: 'Item must have a name!'
    },
    broughtBy: attendeeSchema,  
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

itemSchema.virtual('claimed').get(function() {
  return !(this.broughtBy === null || this.broughtBy === undefined);
});

module.exports = itemSchema;

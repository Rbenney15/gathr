const { Schema, model } = require('mongoose');

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
    eventId: {
      type: String
    },
    broughtBy: {
      type: Schema.Types.ObjectId,
      ref: 'Attendee'
    },  
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

const Item = model('Item', itemSchema);

module.exports = Item;

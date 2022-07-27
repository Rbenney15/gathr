const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    // type Item {
    //   _id: ID
    //   eventId: String
    //   name: String
    //   broughtBy: String
    //   claimed: Boolean
    // }
    eventId: {
      type: String
    },
    name: {
      type: String,
      required: 'Item must have a name!'
    },
    broughtBy: {
      type: String
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

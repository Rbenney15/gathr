const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    // type User {
    //   _id: ID
    //   username: String
    //   email: String
    //   events: [Event]
    //   (v) eventCount: Int
    // }
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

userSchema.virtual('eventCount').get(function() {
  return this.events.length;
})

//// AUTH

// pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('eventCount').get(function() {
  return this.events.length;
});

const User = model('User', userSchema);

module.exports = User;

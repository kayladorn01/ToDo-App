// Require Mongoose library.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

/**
 * I defined the login collection fields and mongoose schema types of the users.
 * A user can have many todo items added to their list.
 */
const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, 'Add your first name'] },
    lastName: { type: String, required: [true, 'Add your last name'] },
    email: { type: String, required: [true, 'Add your email'] },
    password: {
      type: String,
      required: [true, 'Add a password of at least 8 characters'],
      min: 8,
    },
    todo: [{ type: Schema.Types.ObjectId, ref: 'todo' }],
  },
  {
    timestamps: true,
  }
);

// Export userSchema to server.js.
const User = mongoose.model('user', userSchema);
module.exports = User;
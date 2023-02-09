// Require Mongoose library.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * I defined the task/todo collection fields and mongoose schema types of the task items.
 * A user can have many todo items added to their list.
 */
const todoSchema = new Schema(
  {
    item: { type: String },
    completed: { type: Boolean, default: false },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Export todoSchema to server.js.
const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;
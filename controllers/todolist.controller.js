/* The code here will help us to get, create, delete and store the todo list items in
our database.*/
const Todo = require('../models/todolist.model.js');
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

/**
 * The createTodo function will create a new todo item using the token.
 * This token is used to authenticate and find the user who is adds a new todo item to their list.
 */
const createTodo = (req, res) => {
  const item = req.body.item;
  const token = req.headers['authorization'];

  try {
    const decoded = jwt.verify(token, 'jwt-secret');
    const filter = { _id: decoded.id };
    const newTodo = new Todo({
      item,
      user: decoded.id,
    });

    /**
     * We now create and save new items the user enters which will then be added to the database collection.
     * A message will appear if creation has been successful or not.
     */
    newTodo
      .save()
      .then((response) => {
        const update = { $push: { todo: response._id } };

        User.findOneAndUpdate(filter, update).then((response) =>
          res.json(response)
        );
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res
      .status(401)
      .json(
        'An error has occurred. Please make sure you are logged in to add todo items to your list.'
      );
  }
};

/**
 * The deleteTodo function will delete a todo item using the token.
 * This token is used to authenticate and find the user (based on the id number) who is deleting a todo item from their list.
 */
const deleteTodo = (req, res) => {
  const id = req.body.id;
  const token = req.headers['authorization'];

  try {
    const decoded = jwt.verify(token, 'jwt-secret');

    const filter = { _id: id };
    Todo.findOneAndDelete(filter)
      .then(() => res.json('The To Do task has been successfully deleted'))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res
      .status(401)
      .json(
        'An error has occurred. Please make sure you are logged in to delete a todo item from your list.'
      );
  }
};

// We will export the functions in the todolist controller to be used in our todolist routes.
module.exports = {
  createTodo,
  deleteTodo,
};
/* The code here will help us to create and store the login database including
our user's first name, last name, password and email address.*/
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(express.json());

/**
 * The post method creates a new user which is then added to the database collection.
 * A message will appear if creation has been successful or not.
 */
const createUser = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const email = req.body.email;

  const newUser = new User({
    firstName,
    lastName,
    password,
    email,
  });

  newUser
    .save()
    .then(() => res.json('A new user has been added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

/**
 * The getTodo function finds and reads the todo list items of a user based on their id number using the token.
 * This token is used to authenticate and find the user.
 * This data is thereafter returned as a response.
 * An error message will appear if the data could not been returned.
 */
const getTodo = (req, res) => {
  const token = req.headers['authorization'];

  try {
    const decoded = jwt.verify(token, 'jwt-secret');
    User.find({ _id: decoded.id })
      .populate('todo')
      .then((response) => res.json(response[0]))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res
      .status(401)
      .json(
        'An error has occurred. Please make sure you are logged in to view your todo list.'
      );
  }
};

// We will export the functions in the user controller to be used in our user routes.
module.exports = {
  createUser,
  getTodo,
};
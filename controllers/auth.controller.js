

// Created the JWT token in order for user to login. If the details are incorrect, an error will occur.
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const User = require('../models/user.model.js');

app.use(express.json());

/**
 * Created a token authentication function to verify the user as well as to create a JWT used to login.
 * The id of the user is sent as the payload in the token.
 * Authentication will require the email and password of the users.
 * An error will occur if these login details are invalid.
 */

const auth = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userValid = await User.find({ email: email });
  if (!userValid) {
    res.status(403).json('Invalid Email');
  } else if (userValid[0].password !== password) {
    res.status(403).json('Invalid Password');
  } else {
    const payload = {
      id: userValid[0]._id,
    };
    const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {
      algorithm: 'HS256',
    });

    res.json(token);
  }
};

// We will export the functions in the authentication controller to be used in our authentication route.
module.exports = {
  auth,
};
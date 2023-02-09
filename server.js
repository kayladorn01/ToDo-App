const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

/* We add our middleware. Using express.json will allow the server to accept incoming json requests in a 
json format. Morgan will help us to visualize our endpoints when testing out our server with Postman.
Helmet is also used for security purposes. */
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

/* In order for the Express server to access the car data, we will need to use the body-parser middleware. */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure env.
require('dotenv').config();

// We require/get the routes and use each of them
const userRoutes = require('./routes/user.routes.js');
const todoRoutes = require('./routes/todolist.routes.js');
const authRoutes = require('./routes/auth.routes.js');

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);
app.use('/login', authRoutes);

// Enabling the connection to MongoDB via the uri (declared in environment variable from the config file).
const uri =
    "mongodb+srv://admin:admin@my-first-cluster.0kmflhp.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

// Connected to my MongoDB database using mongoose and retrieved the uri and password from the config file.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// An error message will be displayed in the console if MongoDB fails to connect.
mongoose.connection.on('error', function () {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

// A message will be displayed in the console if MongoDB successfully connects.
mongoose.connection.once('open', function () {
  console.log('Successfully connected to the database');
});

/* We will call React build assets by changing this express file. We make use of the production process 
whereby express.static middleware will be used to access files from the frontend index.html folder via HTTP. */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/* To run our server, we specify that it listens to port number 8080 which we get from the environment 
variables. We add a callback to confirm this and to navigate to the port. */
const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log('Navigate to http://localhost:8080');

// I used this function below to initiate an error statement if an error occurs.
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});
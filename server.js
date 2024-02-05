const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');

//create new express app and save it as const 'app'
const app = express();

// import routes
const adRoutes = require('./routes/ads.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

//middleware
app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:8000"],
      credentials: true,
    })
  );
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

//add routes
app.use('/api', adRoutes); // add ads routes to server
app.use('/api', userRoutes); // add users routes to server
app.use('/auth', authRoutes); // add auth routes to server

//catch incorrect links
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

// connects server with the database
const NODE_ENV = process.env.NODE_ENV;
const NBA_USERNAME = process.env.NBA_USERNAME;
const NBA_PASSWORD = process.env.NBA_PASSWORD;
let dbURI = '';

if(NODE_ENV === 'production') dbURI = 'mongodb+srv://${NBA_USERNAME}:${NBA_PASSWORD}@cluster0.mwo8so1.mongodb.net/?retryWrites=true&w=majority'
else if(NODE_ENV === 'test') dbURI = 'mongodb://0.0.0.0:27017/NoticeBoardDBtest';
else dbURI = 'mongodb://0.0.0.0:27017/NoticeBoardDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err)); 

// start express server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
  });


const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');

// secrets
const NODE_ENV = process.env.NODE_ENV;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SESSION = process.env.DB_SESSION;

let dbURI = '';

//database source
if(NODE_ENV === 'production') dbURI = 'mongodb+srv:'+ DB_USERNAME +':'+ DB_PASSWORD +'@cluster0.mwo8so1.mongodb.net/Notice_Board?retryWrites=true&w=majority'
else if(NODE_ENV === 'test') dbURI = 'mongodb://0.0.0.0:27017/NoticeBoardDBtest';
else dbURI = 'mongodb://0.0.0.0:27017/NoticeBoardDB';

//create new express app and save it as const 'app'
const app = express();

// connects server with the database
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

// import routes
const adRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

//middleware
app.use(cors({origin: ["http://localhost:3000"],credentials: true,}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: DB_SESSION, store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false }));

//serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

//add routes
app.use('/api', adRoutes); // add ads routes to server
app.use('/auth', authRoutes); // add auth routes to server

//catch incorrect links
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});



const express = require('express');
const app = express();
require("dotenv").config();
const port = 3001;
const db = require('./db/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true
  }));

// Initializes the database
db.initializeDatabase();

// Middleware needed for the database
app.use(express.json());

// Enable cookie-parser
app.use(cookieParser());

// Port listening
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

// Setting up router
const mainRouter = require('./routes/indexRouter');
app.use('/', mainRouter);

// Adding error handling and logging
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});
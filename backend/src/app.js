const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');

// Port listening
app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
});

// Setting up router
const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);

// Connecting to DB
mongoose.connect('localhost:27017', () => {
    console.log('Connected to DB!');
});
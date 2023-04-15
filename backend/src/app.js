const express = require('express');
const app = express();
const port = 3001;
const db = require('./db/db.js');
const cors = require('cors');

// Initializes the database
db.initializeDatabase();

// Middleware needed for the database
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Port listening
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

// Setting up router
const mainRouter = require('./routes/indexRouter');
app.use('/', mainRouter);
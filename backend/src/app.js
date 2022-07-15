const express = require('express');
const app = express();
const port = 3001;

// Port listening
app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
});

// Setting up router
const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);
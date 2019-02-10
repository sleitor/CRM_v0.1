const express = require('express');
const app = express();
const auth = require('./routes/auth');

app.use('/api/auth', auth);

module.exports = app;

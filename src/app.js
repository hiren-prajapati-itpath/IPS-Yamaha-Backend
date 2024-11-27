/**
 * System and 3rd party libs
 */
const express = require('express');

/**
 * Required Services & Helpers
 */
const CommonMiddleware = require('./middlewares/initialize.middleware');

/**
 * Bootstrap App
 */
const app = express();

// Basic route
app.get('/api', (req, res) => {
  return res.json({ message: 'Thank you for visiting YAMAHA APP 👋🏻 !' });
});

/**
 * Mount Middleware
 */

CommonMiddleware(app);

module.exports = app;

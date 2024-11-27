/**
 * System and 3rd party libs
 */
const express = require('express');
const httpStatus = require('http-status');

/**
 * Required Services & Helpers
 */
const routes = require('./routes');
const ApiError = require('./shared/utils/ApiError');
const CommonMiddleware = require('./middlewares/initialize.middleware')

/**
 * Bootstrap App
 */
const app = express();

/**
 * Mount Middleware
 */

CommonMiddleware(app);

// Basic route
app.get('/api', (req, res) => {
  return res.json('Thank you for visiting YAMAHA APP 👋🏻 !');
});

// api routes
app.use('/api', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;

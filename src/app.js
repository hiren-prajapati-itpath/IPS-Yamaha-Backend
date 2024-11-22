/**
 * System and 3rd party libs
 */
const express = require('express');
const httpStatus = require('http-status');

/**
 * Required Services & Helpers
 */
const routes = require('./routes');
const ApiError = require('./utilities/ApiError');

/**
 * Bootstrap App
 */
const app = express();


// api routes
app.use('/api', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;

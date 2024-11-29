const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const config = require('../config/config');
const morgan = require('../config/morgan');
const { errorConverter, errorHandler } = require('./error.middleware');
const ApiError = require('../shared/utils/ApiError');
const routes = require('../routes');
const successResponseHelper = require('../shared/utils/successResponse');

module.exports = function CommonMiddleware(app) {
  // parse json request body
  app.use(
    express.json({
      limit: `10mb`,
    })
  );

  // parse urlencoded request body
  app.use(
    express.urlencoded({
      limit: '10mb',
      extended: false,
      parameterLimit: 10000,
    })
  );

  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);

  // set security HTTP headers
  app.use(helmet());

  /**
   * CORS middleware
   */
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept ', 'Authorization'],
      credentials: true,
    })
  );

  // Against brute attack
  const rateLimiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!',
  });

  app.use('api', rateLimiter);

  /**
   * Register Routes
   */
  app.use(
    '/api',
    (req, res, next) => {
      res.successResponse = successResponseHelper.successResponse;
      next();
    },
    routes
  );

  // Send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, `The requested resource ${req.originalUrl} was not found `));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  /**
   * Mount global error handler
   */
  app.use(errorHandler);
};

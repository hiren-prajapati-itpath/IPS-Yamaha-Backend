const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { errorConverter, errorHandler } = require('./error.middleware');

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
   * Mount global error handler
   */
  app.use(errorHandler);

  if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }
};

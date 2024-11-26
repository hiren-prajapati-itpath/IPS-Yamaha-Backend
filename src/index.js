const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const sequelize = require('./database/config/connection-DB.config');
require('dotenv').config();

let server;
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info('Connected to MongoDB');
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });
// });

try {
  server = app.listen(config.port, async () => {
    logger.info(`🚀 Server running on http://localhost:${config.port}`);
    try {
      await sequelize.authenticate();
      logger.info('✅ Postgres connection has been established successfully.');
      sequelize.sync({ alter: true, force: false }).then(() => {
        logger.info('🔁 Database Synchronized.');
      });
    } catch (error) {
      logger.error('Sequelize connection error:', error);
    }
  });
} catch (error) {
  logger.error('Error starting the server:', error);
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

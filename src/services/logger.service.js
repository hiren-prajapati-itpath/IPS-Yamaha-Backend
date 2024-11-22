const log4js = require('log4js');
const morgan = require('morgan');

const log = log4js.getLogger();
log.level = process.env.LOG_LEVEL || 'all';
const morganInstance = morgan('dev', {
  stream: {
    write: (str) => {
      log.info(str);
    },
  },
});

module.exports = {
  log,
  morgan: morganInstance,
};

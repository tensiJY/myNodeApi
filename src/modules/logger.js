const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { log, isDev } = require(`../config/keys`);
const { dir: logDir } = log;

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const level = () => {
  return isDev ? 'debug' : 'warn';
};
/*
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);
*/

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS ||' }),
  //winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`
  )
);

const logger = winston.createLogger({
  format,
  level: level(),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      zippedArchive: true,
      handleExceptions: true,
      maxFiles: 30,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      zippedArchive: true,
      maxFiles: 30,
    }),
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;

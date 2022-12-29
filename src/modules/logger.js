const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { LOG_DIR, isDev } = require(`../config/keys`);

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
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ||' }),
  //winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`
  )
);

/**
 * dev
 *  info-> console, log
 *  debug-> console
 *
 * prod
 *  info -> log
 *  debug -> 둘다 출력 안됨
 */
const logger = winston.createLogger({
  format,
  level: level(),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: `${LOG_DIR}/info`,
      filename: `%DATE%.Log`,
      zippedArchive: true,
      handleExceptions: true,
      maxFiles: 30,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${LOG_DIR}/error`,
      filename: `%DATE%.Log`,
      zippedArchive: true,
      maxFiles: 30,
    }),
    /*
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${LOG_DIR}/debug`,
      filename: `%DATE%.Log`,
      zippedArchive: true,
      maxFiles: 30,
    }),
    */
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;

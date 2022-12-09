/**
 * 개발환경에서 http 요청 확인
 * log파일에 기록되지 않고 콘솔로 확인
 */
const { isDev } = require(`../config/keys`);
const morgan = require(`morgan`);
const logger = require(`../modules/logger`);

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  return isDev;
};

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  `:remote-addr :method :url :status :res[content-length] - :response-time ms`,
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

module.exports = morganMiddleware;

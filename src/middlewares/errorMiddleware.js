const ApiError = require('../modules/ApiError');

const { getMessage } = require(`../modules/message`);

const logger = require(`../modules/logger`);

const errorPageNotFound = (req, res) => {
  logger.error(`1 pageNotFound`);
  const errObj = getMessage(`PAGE_NOT_FOUND`);
  const path = req.path;
  return res.status(errObj.status).json({
    path: path,
    ...errObj,
  });
};

const errorHandler = (err, req, res, next) => {
  logger.error(`2 errorHandler`);
  let errObj = null;
  if (err instanceof ApiError) {
    logger.error(``);
  } else {
    errObj = getMessage(``);
  }

  /*
  console.log(`에러입니다 222`);
  console.log(err.status);
  console.log(err.statusCode);
  const { statusCode, message } = err;

  const response = {
    code: statusCode,
    message,
  };
  */
  //res.status(200);
  res.status(500).send({});
};

module.exports = {
  errorPageNotFound,
  errorHandler,
};

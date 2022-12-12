const { getMessage } = require(`../modules/message`);
const logger = require(`../modules/logger`);

/**
 * 404 page not found
 * @param {*} req
 * @param {*} res
 * @returns
 */
const errorPageNotFound = (req, res) => {
  const errObj = getMessage(`PAGE_NOT_FOUND`);
  const path = req.path;

  logger.error(`error page not found : ${path}`);

  return res.status(errObj.status).json({
    ...errObj,
    path: path,
  });
};

/**
 * errorHandler : 공통 에러 처리를 담당
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  const type = err.type || `INTERNAL_SERVER_ERROR`;
  const errObj = getMessage(type);
  const path = req.path;
  logger.error(`error > method : ${req.method}, path : ${path}`);
  logger.error(err);
  logger.error(errObj);

  res.status(errObj.status).json({
    status: errObj.status,
    result: errObj.result,
    code: errObj.code,
    message: errObj.message,
    path: path,
  });
};

module.exports = {
  errorPageNotFound,
  errorHandler,
};

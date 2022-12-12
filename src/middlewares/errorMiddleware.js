const { getMessage } = require(`../modules/message`);
const logger = require(`../modules/logger`);

const errorPageNotFound = (req, res) => {
  const errObj = getMessage(`PAGE_NOT_FOUND`);
  const path = req.path;

  logger.error(`pageNotFound : ${path}`);

  return res.status(errObj.status).json({
    ...errObj,
    path: path,
  });
};

const errorHandler = (err, req, res, next) => {
  const type = err.type || `INTERNAL_SERVER_ERROR`;
  const errObj = getMessage(type);
  const path = req.path;
  logger.error(`errorHandler : ${path}`);
  logger.error(errObj);

  res.status(errObj.status).json({
    ...errObj,
    path: path,
  });
};

module.exports = {
  errorPageNotFound,
  errorHandler,
};

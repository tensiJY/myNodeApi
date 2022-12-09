const { validationResult } = require(`express-validator`);
const { getMessage } = require(`../modules/message.js`);
const logger = require(`../modules/logger`);
const ApiError = require(`../modules/ApiError`);
/*
errors: [
    {
      value: undefined,
      msg: 'VALID_EMAIL_EXISTS',
      param: 'email',
      location: 'body'
    },
    {
      value: undefined,
      msg: 'VALID_EMAIL_REGXP',
      param: 'email',
      location: 'body'
    }
  ]
*/
exports.validError = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    logger.info(`validError`);
    logger.info(JSON.stringify(error));
    //const path = req.originalUrl;
    const errors = error.array();
    const type = getMessage(errors[0].msg);
    //logger.info(
    // `validError > path : ${path}, code : ${messageObj.code}, message : ${messageObj.message}`
    //);
    throw new ApiError(type);
    //return res.status(messageObj.status).json({
    //  ...messageObj,
    //   path: path,
    // });
  }
  next();
};

/*
exports.validErrors = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
*/

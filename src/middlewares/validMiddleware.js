const { validationResult } = require(`express-validator`);
const { getMessage } = require(`../modules/message.js`);
const logger = require(`../modules/logger`);

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
    //logger.error(`valid error \r\n` + JSON.stringify(error));
    const errors = error.array();
    //const messageObj = getMessage(errors[0].msg);
    const type = errors[0].msg;
    const err = new Error(`input valid error : ${type}`);
    err.type = type;
    throw err;
  }
  next();
};

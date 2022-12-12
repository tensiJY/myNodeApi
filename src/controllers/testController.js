const logger = require('../modules/logger');
const { getMessage } = require('../modules/message');

const users = [
  { id: `park`, name: `jy`, email: `` },
  { id: `kim`, name: `pp`, email: `` },
];

exports.findUser = (req, res) => {
  return res.status(200).json({ users: users });
};

exports.saveUser = (req, res) => {
  const messageObj = getMessage('POST');

  return res.status(messageObj.status).json(messageObj);
};

exports.updateUser = (req, res) => {
  const messageObj = getMessage('PUT');
  try {
    asdff;
  } catch (e) {
    logger.error(`updateUser error`);
    logger.error(e);
    const type = e.type || `INTERNAL_SERVER_ERROR`;
    next(e);
  }
  return res.status(messageObj.status).json(messageObj);
};

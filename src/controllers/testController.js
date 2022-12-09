//const ApiError = require('../modules/ApiError');
const { getMessage } = require('../modules/message');
const ApiError = require(`../modules/ApiError`);
const users = [
  { id: `park`, name: `jy`, email: `` },
  { id: `kim`, name: `pp`, email: `` },
];

exports.findUser = (req, res) => {
  return res.status(200).json({ users: users });
};

exports.saveUser = (req, res) => {
  const messageObj = getMessage('POST');

  if (true) {
    throw new ApiError(`!!!!`);
  }

  return res.status(messageObj.status).json(messageObj);
};

exports.updateUser = (req, res) => {
  const messageObj = getMessage('PUT');

  return res.status(messageObj.status).json(messageObj);
};

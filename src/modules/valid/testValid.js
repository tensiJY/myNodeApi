const { body } = require(`express-validator`);
exports.saveUser = [
  body(`email`)
    .exists()
    .withMessage(`VALID_EMAIL_EXISTS`)
    .isEmail()
    .withMessage(`VALID_EMAIL_REGXP`),
];
exports.updateUser = [body(`email`).exists().withMessage(`VALID_EMAIL_EXISTS`)];

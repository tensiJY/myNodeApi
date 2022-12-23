const bcrypt = require(`bcryptjs`); //  bcrypt

/**
 * 비밀번호 암호화
 * @param {*} password
 * @returns   string    암호화된 문자열
 */
exports.hashSync = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * 비밀번호 일치여부
 * @param {*} password 평문 ex) zhfldk
 * @param {*} encodedPassword db에서 암호화된 비밀번호 ex) $2b$10$XtXFp91l0J4t9BFYmo5Qfe5WpOWHbrWFNTLm9IsMtzQalI17GQZ6e
 * @returns   boolean true / false
 */
exports.compareSync = (password, encodedPassword) => {
  return bcrypt.compareSync(password, encodedPassword);
};

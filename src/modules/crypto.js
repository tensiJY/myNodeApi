const bcrypt = require(`bcryptjs`); //  bcrypt

const { AES_KEY } = require(`../config/keys`);

var CryptoJS = require('crypto-js');

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

//  AES, CBC(default), PKCS7(default)
/**
 * 암호화
 * @param {*} data
 * @param {*} salt
 * @returns
 */
exports.aesEncrypt = (data, salt = AES_KEY) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
};

/**
 * 복호화
 * @param {*} data
 * @param {*} salt
 * @returns
 */
exports.aesDecrypt = (data, salt = AES_KEY) => {
  const bytes = CryptoJS.AES.decrypt(data, salt);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

/**
 * 인코딩
 * @param {*} data
 * @returns
 */
exports.encode = (data) => {
  return encodeURIComponent(data);
};

/**
 * 디코딩
 * @param {*} data
 * @returns
 */
exports.decode = (data) => {
  return decodeURIComponent(data);
};

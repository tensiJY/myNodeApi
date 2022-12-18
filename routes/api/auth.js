const express = require(`express`);
const { body } = require(`express-validator`);
const router = express.Router();

const authController = require(`../../controllers/authController`);

//  사용자 등록 -> put
router.put(`/signup`, [
  body(`email`).isEmail().withMessage(`please enter a vaild email.`),
]);

module.exports = router;

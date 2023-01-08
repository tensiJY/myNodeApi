const express = require(`express`);
const { body } = require(`express-validator`);
const router = express.Router();
const User = require(`../../models/user`);
const authController = require(`../../controllers/authController`);

const isAuth = require("../../middlewares/is-auth");

//  사용자 등록 -> put
router.put(
  `/signup`,
  [
    body(`email`)
      .isEmail()
      .withMessage(`please enter a vaild email.`)
      .custom((value, { req }) => {
        //  custom 발리데이션
        //  만약 인증에 성공한다면 함수가 true를 반환하고
        //  인증이 비동기식 작업을 한 경우네는 프로미스를 반환한다.

        //  email의 값과 일치한 것을 찾음
        return User.findOne({ email: value }).then((userDoc) => {
          //  then에 입력하는 userDoc은 데이터베이스에서 찾은 사용자 객체로
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").not().isEmpty(),
  ],
  authController.singup
);

router.post(`/login`, authController.login);

router.get("/status", isAuth, authController.getUserStatus);

module.exports = router;

const User = require(`../models/user`);

const { validationResult } = require(`express-validator`);

const bcrypt = require(`bcryptjs`);

exports.singup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //  에러처리
    //  new Error() 새로운 error 객체를 생성
    const error = new Error(`Validaton failed`);
    error.statusCode = 422;
    //  자동으로 함수 실행을 종료하고
    //  다음 오류 처리 함수나 미들웨어로 향함
    error.data = errors.array();
    throw error;
  }

  const { email, name, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      //  데이터베이스에 저장하고 리턴
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: `User created!`,
        userId: result._id,
      });
    })
    .catch((err) => {
      console.log(`create post : err`);
      //  서버측 오류 이므로 코드가 없으면,
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      //  next으로 에러처리로 이동
      next(err);
    });
};

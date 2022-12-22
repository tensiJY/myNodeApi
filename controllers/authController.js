const User = require(`../models/user`);

const { validationResult } = require(`express-validator`);

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
};

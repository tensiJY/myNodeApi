const User = require(`../models/user`);

const { validationResult } = require(`express-validator`);

const bcrypt = require(`bcryptjs`);

const jwt = require(`jsonwebtoken`);

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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
  /*
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        //  404 : 해당하는 값이 없음
        //  401 : 인증되지 않음
        const error = new Error(`사용자가 없습니다`);
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error(`비밀번호가 일치하지 않습니다`);
        error.statusCode = 401;
        throw error;
      }
      //console.log(loadedUser);
      //console.log(loadedUser._id);
      //  비밀번호 일치
      //  토큰 생성
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        `key123456789`,
        {
          expiresIn: `1h`,
        }
      );
      console.log(`token : ${token}`);
      res.status(200).json({
        message: `로그인 성공`,
        token,
        userId: loadedUser._id.toString(),
      });
      return;
    })
    .catch((err) => {
      //  db 혹은 서버 오류
      //  서버측 오류 이므로 코드가 없으면
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      //  next으로 에러처리로 이동
      next(err);
      return;
    });
    */
};

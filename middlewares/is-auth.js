const jwt = require(`jsonwebtoken`);

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error(`헤더가 없습니다`);
    error.statusCode = 401;

    throw error;
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    //  decode가 있지만 해독할 뿐, 유효한지 확인하지는 않음
    //  무조건 verify를 사용
    //  토큰의 유효성을 확인
    decodedToken = jwt.verify(token, "key123456789");
  } catch (err) {
    console.log(err);
    //  미들웨어가 있기 때문에 -> express.js 오류 핸들링이 이어 받는다.
    //  malformed, signature 에러 등
    err.statusCode = 500;
    throw err;
  }

  //  실패하지는 않았지만, 토큰을 확인할 수 없음. -> 유효성 실패
  if (!decodedToken) {
    const error = new Error(`Not authenticated.`);
    error.statusCode = 401;
    throw error;
  }

  //  인증 성공
  req.userId = decodedToken.userId;
  next();
};

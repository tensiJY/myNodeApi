const { expect } = require("chai");
const authMiddleware = require(`../middlewares/is-auth`);
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

//  단위 테스트
describe(`Auth Middleware`, function () {
  //  헤더에 권한이 없음
  it(`should throw an error if no authoriziation header is present`, function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };

    //  미들웨어 호출
    // expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    //   "Not authenticated."
    // );
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  //  헤더는 있으나 권한 헤더의 값이 없음
  it(`should throw an error if the authorization header is only one string`, function () {
    const req = {
      get: function (headerName) {
        return "xyz";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    //expect(authMiddleware.bind(this, req, {}, () => {})).not.to.throw();
  });

  //  토큰 인증 실패
  it(`should throw an error if the token cannot be verified`, function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  //  decode userId
  it(`should yield a userId after decoding the token`, function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyzlkjlkjlkjlkjkljlkjlkjl";
      },
    };

    /*
    //  함수를 교체하여 사용한다  > 내장된 메서드를 교체하여 사용
    //  수동으로 함수로 교체하지 말고, 라이브러리를 사용
    //  함수가 오버라이드 됨으로, 값이 변경됨..
    jwt.verify = function () {
      return {
        userId: "abcd",
      };
    };
    */

    //  stub
    //  객체명, 함수명
    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "abcd",
    });

    authMiddleware(req, {}, () => {});

    expect(req).to.have.property(`userId`);
    //  값이 일치하지 확인
    expect(req).to.have.property(`userId`, "abcd");
    //  호출 되었는지 확인
    expect(jwt.verify.called).to.be.true;
    //  함수를 복원
    jwt.verify.restore();
  });
});

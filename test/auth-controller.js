const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models/user");
const AuthController = require("../controllers/authController");
const { default: mongoose } = require("mongoose");

describe("Auth Controller - Login", function () {
  //  stub를 사용하는 이유 중 하나는 활성화된 데이터베이스를 사용하지 않기 위함
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      //console.log(result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });

  //  테스트 데이터베이스를 연동
  //  해당 사용자가 존재하는지 여부
  it(`Should send a response with a valid user status for an existing user`, function (done) {
    mongoose
      .connect("mongodb://localhost:27017/test-messages")
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "63ba4c2814334adf4a0d4cda",
        });
        return user.save();
      })
      .then(() => {
        //  해당하는 사용자를 찾음
        const req = { userId: "63ba4c2814334adf4a0d4cda" };
        //  status가 응답객체를 반환
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.userStatus = data.status;
          },
        };
        AuthController.getUserStatus(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal("I am New!");
            //  done()을 호출해 Mocha 실행을 종료합니다
            User.deleteMany({})
              .then(() => {
                return mongoose.disconnect();
              })
              .then(() => {
                done();
              });
          })
          .catch((err) => console.log(err));
      });
  });
});

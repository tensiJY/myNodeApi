const express = require(`express`);

const { body, validationResult } = require(`express-validator`);
const feedController = require(`../../../controllers/feedController`);

const router = express.Router();
//  라우터에서 컨트롤러 실행s
router.get(`/posts`, feedController.getPosts);
router.post(
  `/post`,
  [
    body(`title`).trim().isLength({ min: 3 }),
    body(`content`).trim().isLength({ min: 5 }),
  ],
  (req, res, next) => {
    console.log(`valid`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //  에러처리
      //  new Error() 새로운 error 객체를 생성
      const error = new Error(`Validaton failed`);
      error.statusCode = 422;
      //  자동으로 함수 실행을 종료하고
      //  다음 오류 처리 함수나 미들웨어로 향함
      throw error;
    }
    next();
  },
  feedController.createPost
);

module.exports = router;

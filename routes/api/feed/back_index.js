const express = require(`express`);

const { body, validationResult } = require(`express-validator`);
const feedController = require(`../../../controllers/feedControllers`);

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
      throw error;
    }
    next();
  },
  feedController.createPost
);

module.exports = router;

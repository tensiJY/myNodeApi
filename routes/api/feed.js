const express = require(`express`);

const { body } = require(`express-validator`);

const router = express.Router();
const feedController = require(`../../controllers/feedController`);

const isAuth = require(`../../middlewares/is-auth`);
//  라우터에서 컨트롤러 실행s
router.get(`/posts`, isAuth, feedController.getPosts);
router.post(
  `/post`,
  [
    body(`title`).trim().isLength({ min: 3 }),
    body(`content`).trim().isLength({ min: 5 }),
  ],
  isAuth,
  feedController.createPost
);

router.get(`/post/:postId`, isAuth, feedController.getPost);

router.put(`/post/:postId`, isAuth, feedController.updatePost);

router.delete(`/post/:postId`, isAuth, feedController.deletePost);

module.exports = router;

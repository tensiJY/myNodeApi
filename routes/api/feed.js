const express = require("express");
const feedController = require("../../controllers/feedController");

const router = express.Router();
//  라우터에서 컨트롤러 실행
router.get("/posts", feedController.getPosts);
router.post("/posts", feedController.createPost);

module.exports = router;

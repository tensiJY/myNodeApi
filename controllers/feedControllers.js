const Post = require(`../models/post`);
const { validationResult } = require(`express-validator`);

exports.getPosts = (req, res, next) => {
  console.log(`getPosts`);
  Post.find()
    .then((result) => {
      res.status(200).json({
        message: `success`,
        posts: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
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

  if (!req.file) {
    const error = new Error(`no image provided.`);
    error.statusCode = 422;
    throw error;
  }

  console.log("createPost");
  console.log(req.body);
  console.log(req.file);
  const imageUrl = req.file.path;
  const { title, content } = req.body;

  //  키 자동생성
  const post = new Post({
    title,
    content,
    creator: {
      name: `park`,
    },
    imageUrl: imageUrl,
  });
  //  db 저장
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: `success`,
        post: result,
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

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(`getPost : ${postId}`);
  Post.findById(postId)
    .then((result) => {
      console.log(result);
      if (!result) {
        const error = new Error(`Could not find post`);
        error.statusCode = 404;
        //  에러를 생성하면 밑에 catch 블럭에서 에러 처리가 된다
        throw error;
      }
      res.status(200).json({
        message: `success`,
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

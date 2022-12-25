const { validationResult } = require(`express-validator`);
const fs = require(`fs`);
const path = require(`path`);

//  게시물과 사용자 연결
const Post = require(`../models/post`);
const User = require(`../models/user`);

exports.getPosts = (req, res, next) => {
  console.log(`getPosts`);
  //  현재 페이지 : 기본값 1
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;

  //  데이터의 총 갯수를 확인
  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((posts) => {
      res.status(200).json({
        message: `success`,
        posts: posts,
        totalItems: totalItems,
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
  //console.log(req.body);
  //console.log(req.file);
  const imageUrl = req.file.path;
  const { title, content } = req.body;
  //console.log(req.userId);
  //  키 자동생성
  const post = new Post({
    title,
    content,
    creator: req.userId,
    imageUrl: imageUrl,
  });

  let creator;
  //  db 저장 -> 게시물과 사용자 연결
  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: `success`,
        post: post,
        creator: {
          _id: creator._id,
          name: creator.name,
        },
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

exports.updatePost = (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  let { image: imageUrl } = req.body;
  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    const error = new Error(`No filed picked.`);
    error.statusCode = 422;
    throw error;
  }

  console.log(`updatePost postId : ${postId}`);

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error(`could not find post.`);
        error.statusCode = 404;
        throw error;
      }
      //  작성자 확인 > 토큰과 비교
      if (req.userId !== post.creator.toString()) {
        const error = new Error(`Not authorized!`);
        error.statusCode = 403;
        throw error;
      }

      //  저장하기 이전에 이미지 경로가 이전 게시물에 저장했던 이미지인지 확인
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }

      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then((result) => {
      //  새 리소스를 생성하지 않았으므로 200
      res.status(200).json({
        message: "Post updated!",
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

const clearImage = (filePath) => {
  //  상위 폴더로 감
  filePath = path.join(__dirname, "../", filePath);
  fs.unlink(filePath, (err) => {
    console.log(`filePath : ${filePath}`);
    console.log(err);
  });
};

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error(`could not find post.`);
        error.statusCode = 404;
        throw error;
      }

      //  작성자 확인 > 토큰과 비교
      if (req.userId !== post.creator.toString()) {
        const error = new Error(`Not authorized!`);
        error.statusCode = 403;
        throw error;
      }
      //  check logged in user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      //  게시물과 사용자의 관계 -> 사용자 스키마의 게시물 아이디 삭제
      //  pull 메서드를 사용
      user.posts.pull(postId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Delete post",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

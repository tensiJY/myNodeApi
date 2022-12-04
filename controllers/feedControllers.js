const Post = require(`../models/post`);

exports.getPosts = (req, res, next) => {
  console.log(`getPosts`);
  res.status(200).json({
    posts: [
      {
        _id: `_0001`,
        title: `first post`,
        content: `This is te first Post!`,
        imageUrl: `images/1.jpg`,
        creator: {
          name: `jyp`,
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  console.log("createPost");
  console.log(req.body);
  const { title, content } = req.body;

  //  키 자동생성
  const post = new Post({
    title,
    content,
    creator: {
      name: `park`,
    },
    imageUrl: `images/1.jpg`,
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
      console.log(err);
    });
};

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

  res.status(201).json({
    message: `success`,
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: `jyp`,
      },
      createAt: new Date(),
    },
  });
};

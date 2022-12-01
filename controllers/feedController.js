exports.getPosts = (req, res, next) => {
  console.log("getPosts");
  res.status(200).json({
    posts: [{ title: "first post", content: "This is te first Post!" }],
  });
};

exports.createPost = (req, res, next) => {
  console.log(req.body);
  const { title, content } = req.body;

  res.status(201).json({
    message: "success",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
};

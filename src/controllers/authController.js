exports.getTest = (req, res) => {
  console.log(`call getTest`);
  res.json({ data: 1 });
};

exports.createTest = (req, res) => {
  const { title, content } = req.body;

  res.status(201).json({
    message: `success`,
    post: {
      id: new Date().toISOString,
      title: title,
      content: content,
    },
  });
};

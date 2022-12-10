const getUuid = (req, res, next) => {
  console.log(`call getUuid`);
  res.status(200).json({
    message: `success`,
  });
};

module.exports = {
  getUuid,
};

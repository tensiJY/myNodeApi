const express = require(`express`);

const feedRoutes = require(`./feed`);
const testRoutes = require(`./test`);

const router = express.Router();
router.use(`/feed`, feedRoutes);
router.use(`/test`, testRoutes);

module.exports = router;

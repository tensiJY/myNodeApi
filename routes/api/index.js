const express = require(`express`);

const feedRoutes = require(`./feed`);
const authRoutes = require(`./auth`);
const testRoutes = require(`./test`);

const router = express.Router();
router.use(`/feed`, feedRoutes);
router.use(`/auth`, authRoutes);
router.use(`/test`, testRoutes);

module.exports = router;

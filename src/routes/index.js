const express = require(`express`);

const authRoutes = require(`./api/auth`);
const testRoutes = require(`./api/test`);

const router = express.Router();
router.use(`/auth`, authRoutes);

/**
 * @swagger
 * tags:
 *   name: test
 *   description: test api
 */
router.use(`/test`, testRoutes);

module.exports = router;

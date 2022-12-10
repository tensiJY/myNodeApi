const express = require(`express`);
const testController = require(`../../../controllers/testController`);
const router = express.Router();

router.use(`/uuid`, testController.getUuid);

module.exports = router;

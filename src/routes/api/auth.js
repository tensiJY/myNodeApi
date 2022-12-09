const express = require(`express`);
const { authController } = require(`../../controllers`);

const router = express.Router();

router.get(`/test`, authController.getTest);
router.post(`/test`, authController.createTest);

module.exports = router;

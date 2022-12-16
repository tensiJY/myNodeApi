const express = require(`express`);
const { testValid } = require(`../../modules/valid`);
const { validError } = require(`../../middlewares/validMiddleware`);

const { testController } = require(`../../controllers`);

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/test/users:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [test]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */
router.get(`/users`, testController.findUser);

/**
 * @swagger
 * paths:
 *  /api/test/users:
 *    post:
 *      summary: "사용자를 등록한다"
 *      description : ""
 *      tags: [test]
 */
router.post(
  `/users`,
  [...testValid.saveUser],
  validError,
  testController.saveUser
);

router.put(
  `/users`,
  [...testValid.updateUser],
  validError,
  testController.updateUser
);

router.post(`/400`, (req, res, next) => {
  //console.log(`call 400`);
  try {
    const err = new Error(`id duplicated`);
    err.type = `USER_ID_DUPLICATED`;
    throw err;
  } catch (e) {
    const type = e.type || `INTERNAL_SERVER_ERROR`;
    next(e);
  }
});

router.put(`/500`, (req, res, next) => {
  try {
    asdfsdf;
  } catch (e) {
    // logger.error(`updateUser error`);
    // logger.error(e);
    const type = e.type || `INTERNAL_SERVER_ERROR`;
    next(e);
  }
});

module.exports = router;

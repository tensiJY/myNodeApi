const express = require(`express`);
const { body } = require(`express-validator`);
const { validError } = require(`../../middlewares/valid.middleware`);

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
  [
    body(`email`)
      .exists()
      .withMessage(`VALID_EMAIL_EXISTS`)
      .isEmail()
      .withMessage(`VALID_EMAIL_REGXP`),
    validError,
  ],
  testController.saveUser
);

router.put(
  `/users`,
  [
    body(`email`)
      .exists()
      .withMessage(`VALID_EMAIL_EXISTS`)
      .isEmail()
      .withMessage(`VALID_EMAIL_REGXP`),
  ],
  validError,
  testController.updateUser
);
module.exports = router;

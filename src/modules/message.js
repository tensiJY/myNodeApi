const CODE = {
  GET: {
    status: 200,
    result: true,
  },
  POST: {
    status: 201,
    result: true,
  },
  PUT: {
    status: 201,
    result: true,
  },
  DELETE: {
    status: 200,
    result: true,
  },
  PAGE_NOT_FOUND: {
    status: 404,
    result: false,
    code: `-100`,
    message: `해당하는 페이지를 찾을 수가 없습니다`,
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    result: false,
    code: `-101`,
    message: `서버처리중 오류가 발생하였습니다`,
  },
  VALID_EMAIL_EXISTS: {
    status: 400,
    result: false,
    code: `-1`,
    message: `이메일을 입력해주시기 바랍니다`,
  },
  VALID_EMAIL_REGXP: {
    status: 400,
    result: false,
    code: `-2`,
    message: `이메일을 입력해주시기 바랍니다`,
  },
  USER_ID_DUPLICATED: {
    status: 400,
    result: false,
    code: `-3`,
    message: `아이디가 중복됩니다`,
  },
};

module.exports = {
  getMessage: (type, status = null) => {
    const codeObj = CODE[type];
    return {
      ...codeObj,
      status: status || codeObj.status,
    };
  },
};

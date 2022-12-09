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
};

module.exports = {
  getMessage: (code, status = null) => {
    const codeObj = CODE[code];
    return {
      ...codeObj,
      status: status || codeObj.status,
    };
  },
};

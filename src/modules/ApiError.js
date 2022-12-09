class ApiError extends Error {
  constructor(type, message, stack = '') {
    super(message); //  에러 메시지
    this.type = type; //
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;

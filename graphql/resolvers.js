const User = require(`../models/user`);

module.exports = {
  cretateUser: async (args, req) => {
    console.log(args);
    const { email, name, password } = args.userInput;
  },
};

const { User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();

        return users;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    register: async ( _, args) => {
      const { username, email, password, confirmPassword } = args;

      try {
        if (password === confirmPassword) {

          const hashPassword = await bcrypt.hash(password, 10);

          const createUser = await User.create({
            username: username,
            email: email,
            password: hashPassword
          });

          if (createUser)
            return {
              status: 200,
              message: "User created!",
            };
        } else if (password !== confirmPassword) {
          return {
            status: 400,
            message: "Confirmation password must match the password!",
          };
        }
      } catch (err) {
        // console.log(err);
        return {
          status: 400,
          message: err.errors[0].message,
        };
      }
    },
  },
};

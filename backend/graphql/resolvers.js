const { User } = require("../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
      let user = {};
      if (context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
            throw new AuthenticationError("Unauthenticated");
          }

          user = decodedToken;
        });
      }
      try {
        console.log("user", user);
        const users = await User.findAll();

        return users;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      const { username, email, password, confirmPassword } = args.input;

      let errors = {};

      try {
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "repeat password must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        if (password === confirmPassword) {
          const hashPassword = await bcrypt.hash(password, 10);

          const createUser = await User.create({
            username: username,
            email: email,
            password: hashPassword,
          });

          if (createUser)
            return {
              status: 200,
              message: "User created!",
            };
        }
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.path} is already taken`)
          );
        } else if (err.name === "SequelizeValidationError") {
          err.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError("Bad input", { errors });
      }
    },

    login: async (_, args) => {
      const { username, password } = args.input;

      let errors = {};

      try {
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";

        const user = await User.findOne({
          where: { username },
        });

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors });
        }

        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found", { errors });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          errors.password = "password is incorrect";
          throw new AuthenticationError("password is incorrect", { errors });
        }

        const token = await jwt.sign(
          {
            username,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return { status: 200, message: token };
      } catch (err) {
        throw err;
      }
    },
  },
};

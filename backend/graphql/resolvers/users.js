const { User, Post } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const fs = require("fs");

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Unauthenticated");

      try {
        const users = await User.findAll();

        return users;
      } catch (err) {
        throw err;
      }
    },
    getUser: async (_, args) => {
      const { username } = args;

      try {
        const user = await User.findOne({
          where: { username: username },
          attributes: ["profileImage", "bio"],
          raw: true,
          nest: true,
        });

        const buf = Buffer.from(user.profileImage, "base64");

        return {
          profileImage: buf.toString(),
          bio: user.bio,
        };
      } catch (err) {
        throw err;
      }
    },
    getPersonalData: async (_, args) => {
      const { id } = args;

      try {
        const user = await User.findOne({
          where: { id },
        });

        if (user) {
          const buf = Buffer.from(user.dataValues.profileImage, "base64");

          return {
            profileImage: buf.toString(),
            name: user.dataValues.name,
            username: user.dataValues.username,
            bio: user.dataValues.bio,
            email: user.dataValues.email,
            gender: user.dataValues.gender,
          };
        }
      } catch (err) {
        throw err;
      }
    },
    getProfilePicture: async (_, args) => {
      const { id } = args;

      try {
        const user = await User.findOne({
          where: { id },
          attributes: ["profileImage"],
        });

        if (user) {
          const buf = Buffer.from(user.dataValues.profileImage, "base64");

          return {
            profileImage: buf.toString(),
          };
        }
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
            id: user.id,
            username: user.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return { status: 200, message: token };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (_, args) => {
      const { id, profileImage, name, username, bio, email, gender } =
        args.input;

      let errors = {};

      const buffer = Buffer.from(
        profileImage.substring(profileImage.indexOf(",") + 1)
      );

      if (buffer.length > 1048576) {
        return { status: 200, message: "Image size is too big!" };
      }

      try {
        const user = await User.update(
          {
            profileImage: profileImage,
            name: name,
            username: username,
            bio: bio,
            email: email,
            gender: gender,
          },
          {
            where: { id },
          }
        );

        if (user) {
          return { status: 200, message: "user updated" };
        } else {
          throw new UserInputError(
            "Something went wrong! Please try again later...",
            { errors }
          );
        }
      } catch (err) {
        throw err;
      }
    },
  },
};

const { Post, User } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const fs = require("fs");

module.exports = {
  Query: {
    getUserPosts: async (_, args) => {
      const { username } = args;

      try {
        const posts = await Post.findAll({
          where: { username: username },
          raw: true,
          nest: true,
        });

        let arr = [];

        for (let i = 0; i < posts.length; i++) {
          let post = posts[i];
          arr.push({
            username: post.username,
            content: Buffer.from(post.content, "base64").toString(),
            content_type: post.content_type,
            content_description: post.content_description,
            content_location: post.content_location,
          });
        }

        return arr;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createNewPost: async (_, args, { user }) => {
      if (!user) throw new AuthenticationError("Unauthenticated");

      const { content, content_type, content_description, content_location } =
        args.input;

      try {
        const post = await Post.create({
          username: user.username,
          content: content,
          content_type: content_type,
          content_description: content_description,
          content_location: content_location,
        });

        if (post) {
          return { status: 200, message: "Your post has been shared." };
        } else {
          return {
            status: 200,
            message: "Your post couldn't be shared... Please try again.",
          };
        }
      } catch (err) {
        throw err;
      }
    },
  },
};

const userResolvers = require("./users");
const postsResolvers = require("./posts");

module.exports = {
  //   Message: {
  //     createdAt: (parent) => parent.createdAt.toISOString(),
  //   },
  Query: {
    ...userResolvers.Query,
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};

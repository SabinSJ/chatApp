const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type Status {
    status: Int
    message: String
  }

  type Query {
    getUsers: [User]!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    register(input: RegisterInput): Status!
    login(input: LoginInput): Status!
  }
`;

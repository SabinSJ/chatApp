const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    profileImage: String
    name: String
    username: String!
    bio: String
    email: String!
    gender: String
  }

  type Status {
    status: Int
    message: String
  }

  type getProfilePicture {
    profileImage: String
  }

  type Query {
    getUsers: [User]!
    getPersonalData(id: Int): User
    getProfilePicture(id: Int): getProfilePicture
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

  input UpdateInput {
    id: Int!
    profileImage: String
    name: String
    username: String!
    bio: String
    email: String!
    gender: String
  }

  type Mutation {
    register(input: RegisterInput): Status!
    login(input: LoginInput): Status!
    updateUser(input: UpdateInput): Status!
  }
`;

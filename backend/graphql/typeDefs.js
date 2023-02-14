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

  type getUserPosts {
    username: String
    content: String
    content_type: String
    content_description: String
    content_location: String
  }

  type getUser {
    # username: String
    profileImage: String
    bio: String
    # content: String
    # content_type: String
    # content_description: String
    # content_location: String
  }

  type Query {
    getUsers: [User]!
    getPersonalData(id: Int): User
    getProfilePicture(id: Int): getProfilePicture
    getUser(username: String): getUser
    getUserPosts(username: String): [getUserPosts]
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

  input CreatePostInput {
    content: String
    content_type: String
    content_description: String
    content_location: String
  }

  type Mutation {
    register(input: RegisterInput): Status!
    login(input: LoginInput): Status!
    updateUser(input: UpdateInput): Status!
    createNewPost(input: CreatePostInput): Status!
  }
`;

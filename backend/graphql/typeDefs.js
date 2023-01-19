const {gql} = require('apollo-server');

module.exports = gql`
    type User {
        username: String!
        email: String!
        createdAt: String
        updatedAt: String
    }

    type Status {
        status: Int,
        message: String
    }

    type Query {
        getUsers: [User]!
    }

    type Mutation {
        register(username: String!, email: String!, password: String!, confirmPassword: String!): Status!
    }
`
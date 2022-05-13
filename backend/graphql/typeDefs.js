const gql = require('graphql-tag')

module.exports = gql`
  type Bugs {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    username: String!
  }

  type Users {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getBugs: [Bugs]
  }

  type Mutation {
    # Have all the logic (functions) to the database
    # input a type RegisterInput and return a type User
    registerUser(registerInput: RegisterInput): Users!
  }
`

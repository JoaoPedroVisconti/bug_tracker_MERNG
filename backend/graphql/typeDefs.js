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

  input LoginInput {
    email: String!
    password: String!
  }

  input BugInput {
    title: String!
    body: String!
  }

  type Query {
    getBugs: [Bugs]
    getBug(bugId: ID!): Bugs
  }

  type Mutation {
    # Have all the logic (functions) to the database
    # input a type RegisterInput and return a type User
    registerUser(registerInput: RegisterInput): Users!
    loginUser(loginInput: LoginInput): Users!
    createBug(bugInput: BugInput): Bugs!
    deleteBug(bugId: ID!): String!
  }
`

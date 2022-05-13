const gql = require('graphql-tag')

module.exports = gql`
  type Bugs {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getBugs: [Bugs]
  }
`

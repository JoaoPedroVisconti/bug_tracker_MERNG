const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
const { MONGODB } = require('./config.js')

const Bugs = require('./models/BugModel')

const typeDefs = gql`
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

const resolvers = {
  Query: {
    async getBugs() {
      try {
        const bugs = await Bugs.find()

        return bugs
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })

const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const { MONGODB } = require('./config.js')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/indexResolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  // Taken the request body
  // and forward in the context
  // to be access in the postsResolvers
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

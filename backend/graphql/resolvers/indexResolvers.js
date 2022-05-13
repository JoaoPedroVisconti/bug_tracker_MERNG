const bugsResolvers = require('./bugsResolvers')
const usersResolvers = require('./usersResolvers')

module.exports = {
  Query: {
    ...bugsResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
  },
}

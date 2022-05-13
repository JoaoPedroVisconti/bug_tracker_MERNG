const Bugs = require('../../models/BugModel')
const checkAuth = require('../../util/check-auth')

module.exports = {
  Query: {
    async getBugs() {
      try {
        const bugs = await Bugs.find()

        return bugs
      } catch (err) {
        throw new Error(err)
      }
    },

    async getBug(_, { bugId }) {
      try {
        const bug = await Bugs.findById(bugId)

        if (bug) {
          return bug
        } else {
          throw new Error('Bug not found')
        }
      } catch (err) {
        throw new Error('Something went wrong')
      }
    },
  },

  Mutation: {
    // Inside the context we have the req body (from index.js)
    async createBug(_, { bugInput: { title, body } }, context) {
      // Going to use the middleware in multiple routes
      // add in its own function inside check-auth.js
      const user = checkAuth(context)
      console.log(user)

      const newBug = new Bugs({
        title,
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      })

      const bug = await newBug.save()

      return bug
    },
  },
}

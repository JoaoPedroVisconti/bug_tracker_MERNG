const Bugs = require('../../models/BugModel')

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
}

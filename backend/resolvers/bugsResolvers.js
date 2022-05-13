const Bugs = require('../models/BugModel')

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
  },
}

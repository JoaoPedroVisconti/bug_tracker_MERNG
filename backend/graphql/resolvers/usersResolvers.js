const User = require('../../models/UserModel')

module.exports = {
  // Mutation: {
  //   register(parent, args, context, info)
  // }
  // We don't need the parent right now
  // args will have the registerInputs

  Mutation: {
    registerUser(_, args, context, info) {
      //todo: validate user data
      //todo: make sure username doesn't already exist
      //todo: hash the password and create an authentication token
    },
  },
}

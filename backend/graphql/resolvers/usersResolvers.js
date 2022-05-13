const User = require('../../models/UserModel')

const { SECRET_KEY } = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  // Mutation: {
  //   register(parent, args, context, info)
  // }
  // We don't need the parent right now
  // args will have the registerInputs

  Mutation: {
    async registerUser(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //todo: validate user data
      //todo: make sure username doesn't already exist
      //todo: hash the password and create an authentication token

      password = await bcrypt.hash(password, 12)

      // form user object
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      // Save the user to the database
      const res = await newUser.save()

      // Create token to the user
      const token = jwt.sign(
        {
          // Data to encode
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}

const User = require('../../models/UserModel')
const { SECRET_KEY } = require('../../config')
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

function generateToken(user) {
  return jwt.sign(
    {
      // Data to encode
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  // Mutation: {
  //   register(parent, args, context, info)
  // }
  // We don't need the parent right now
  // args will have the registerInputs

  Mutation: {
    // Function (mutation) for login a user
    async loginUser(_, { loginInput: { email, password } }) {
      const { errors, valid } = validateLoginInput(email, password)

      if (!valid) {
        throw new UserInputError('Error', { errors })
      }

      const user = await User.findOne({ email })

      // Check if email exist
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      // Check if the password is correct
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong password'
        throw new UserInputError('Wrong password', { errors })
      }

      // username and password are correct, so let's issue a token for the user
      // same function used for registering, create a separate function
      // Create token to the user
      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },

    // Function (mutation) for register a user
    async registerUser(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const usernameCheck = await User.findOne({ username: username })
      if (usernameCheck) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        })
      }
      const emailCheck = await User.findOne({ email: email })
      if (emailCheck) {
        throw new UserInputError('email is taken', {
          errors: {
            email: 'This email is taken',
          },
        })
      }

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
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}

const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = (context) => {
  // context = { ... headers } -> context has the headers, among other things
  const authHeader = context.req.headers.authorization

  if (authHeader) {
    // Bearer ....token....
    // split returns a array of things, need the second value
    const token = authHeader.split('Bearer ')[1]

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]")
  }

  throw new Error('Authorization header must be provided')
}

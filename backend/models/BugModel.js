const { model, Schema } = require('mongoose')

const bugsSchema = new Schema({
  title: String,
  body: String,
  username: String,
  createdAt: String,

  // Connect to another model. Link the Bugs to a specific User
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
})

module.exports = model('Bugs', bugsSchema)

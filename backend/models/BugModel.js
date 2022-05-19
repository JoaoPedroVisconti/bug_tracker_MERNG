const { model, Schema } = require('mongoose')

const bugsSchema = new Schema({
  title: String,
  body: String,
  username: String,
  createdAt: String,

  // Connect to another model. Link the Bugs to a specific User
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  participants: [
    {
      participantId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      username: String,
    },
  ],

  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
})

module.exports = model('Bugs', bugsSchema)

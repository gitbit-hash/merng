const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  ownerAvatar: String,

  comments: [
    {
      body: String,
      username: String,
      ownerAvatar: String,
      createdAt: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],

  likes: [
    {
      username: String,
      createdAt: String
    }
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Post', postSchema);
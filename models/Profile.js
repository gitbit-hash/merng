const { model, Schema } = require('mongoose');

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  username: String,
  name: String,
  bio: String,
  location: String,
});

module.exports = model('Profile', profileSchema);
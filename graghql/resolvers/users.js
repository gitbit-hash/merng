const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInput } = require('../../utils/validators.js');

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // validate user data
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // make sure user is already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('username is taken, try another one', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          username: res.username,
          email: res.email
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
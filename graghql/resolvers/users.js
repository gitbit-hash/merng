const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, ValidationError } = require('apollo-server');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { SECRET_KEY } = require('../../config');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators.js');
const checkAuth = require('../../utils/check-auth')

const processUpload = require('../../utils/proccess-upload');

const generateToken = user => jwt.sign(
  {
    id: user.id,
    username: user.username,
    email: user.email,
  },
  SECRET_KEY,
  { expiresIn: '1h' }
);

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // validate user data
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // make sure user's username is already exist
      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('username is taken, try another one', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      // make sure user's email is already exist
      user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('email is taken, try another one', {
          errors: {
            email: 'This email is taken'
          }
        });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumiovmdw/image/upload/v1609518869/149071_dvztpj.png'

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
        avatar: DEFAULT_AVATAR
      });

      // save user to the database
      const res = await newUser.save();

      // create user profile
      const newProfile = new Profile({
        user: res._id,
        username: res.username
      });

      // save profile to the database
      await newProfile.save();

      //generate token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      }
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },

    async uploadImage(_, { file }, context) {
      // check user auth
      const { id } = checkAuth(context);

      //  1. Validate file metadata.
      const { filename } = await file;

      if (!/\.(jpg|jpeg|png)$/i.test(filename)) {
        throw new ValidationError('Please select a valid image file');
      }

      // 2. Stream file contents into cloud storage:
      const url = await processUpload(file);

      // 3. Updtae the Image url in your DB.
      try {
        await User.findByIdAndUpdate(id, { avatar: url });
      } catch (err) {
        throw new Error(err)
      }

      return { url, filename };
    }
  }
}
const Profile = require('../../models/Profile');

const { ApolloError } = require('apollo-server');

const checkAuth = require('../../utils/check-auth');

const { validateProfileInput } = require('../../utils/validators')
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    async getProfiles(_, __, context) {

      checkAuth(context);

      try {
        let profiles = await Profile
          .find()
          .populate({
            path: 'user',
            select: 'avatar'
          })

        profiles = profiles.map(({ _doc }) =>
          ({
            ..._doc,
            id: _doc._id,
            avatar: _doc.user.avatar
          }));

        return profiles;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserProfile(_, { username }, context) {

      checkAuth(context);

      try {
        const profile = await Profile
          .findOne({ username })
          .populate({
            path: 'user',
            select: 'avatar'
          });

        if (!profile) {
          throw new ApolloError('Profile not found.')
        }

        const userProfile = {
          id: profile._id,
          avatar: profile.user.avatar,
          username: profile.username,
          name: profile.name || '',
          bio: profile.bio || '',
          location: profile.location || ''
        }
        return userProfile;

      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async editProfile(_, { editProfileInput: { name, bio, location } }, context) {
      const { username } = checkAuth(context);

      // check profile inputs length
      const { errors, valid } = validateProfileInput(name, bio, location);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      try {
        const profile = await Profile.findOneAndUpdate({ username }, { name, bio, location }, { new: true });

        await profile.save();

        return profile;

      } catch (err) {
        throw new Error(err);
      }
    }
  }
}

const Profile = require('../../models/Profile');

const checkAuth = require('../../utils/check-auth');


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
    }
  }
}

const postResolvers = require('./posts');
const usersResolvers = require('./users');

module.exports = {
  Post: {
    commentCount: parent => parent.comments.length,
    likeCount: parent => parent.likes.length
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation
  }
}
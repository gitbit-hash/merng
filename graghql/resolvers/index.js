const postResolvers = require('./posts');
const userResolvers = require('./users');
const profileResolvers = require('./profiles');

const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Post: {
    commentCount: parent => parent.comments.length,
    likeCount: parent => parent.likes.length
  },
  Upload: GraphQLUpload,
  Query: {
    ...postResolvers.Query,
    ...profileResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation
  }
}
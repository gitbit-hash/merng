const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const User = require('../../models/User');
const checkAuth = require('../../utils/check-auth');


module.exports = {
  Query: {
    async getPosts() {
      try {
        let posts = await Post
          .find()
          .populate({
            path: 'user',
            select: 'avatar'
          })
          .sort({ createdAt: -1 });

        posts = posts.map(({ _doc }) =>
          ({
            ..._doc,
            id: _doc._id,
            ownerAvatar: _doc.user.avatar
          }));

        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        let post = await Post
          .findById(postId)
          .populate({
            path: 'user',
            select: 'avatar'
          })
          .populate({
            path: 'comments',
            populate: [{
              path: 'user',
              select: 'avatar'
            }]
          });

        post = {
          ...post._doc,
          id: post._doc._id,
          ownerAvatar: post._doc.user.avatar,
          comments: post.comments.map(({ _doc }) => ({
            ..._doc,
            id: _doc._id,
            ownerAvatar: _doc.user.avatar
          }))
        }

        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const auth = checkAuth(context);

      const user = await User.findById(auth.id);

      if (body.trim() === '') {
        throw new UserInputError('Post body must no be empty')
      }

      const newPost = new Post({
        user: user.id,
        username: user.username,
        ownerAvatar: user.avatar,
        body,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();
          return 'Post successfully deleted';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async createComment(_, { postId, body }, context) {
      const auth = checkAuth(context);

      const user = await User.findById(auth.id);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment must not be empty'
          }
        })
      }
      try {
        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({
            user: user.id,
            body,
            username: user.username,
            ownerAvatar: user.avatar,
            createdAt: new Date().toISOString()
          })

          await post.save();

          return post;
        } else {
          throw new UserInputError('Post not found');
        }

      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Post not found');
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (username && post) {
        if (post.likes.find(like => like.username === username)) {
          // Post alreay liked / unlike it
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // Post not liked yet, add like
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
}

const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');


module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
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
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Post body must no be empty')
      }

      const newPost = new Post({
        user: user.id,
        username: user.username,
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
      const { username } = checkAuth(context);

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
            body,
            username,
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

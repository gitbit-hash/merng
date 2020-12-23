const gql = require('graphql-tag');

module.exports = gql`
type Post {
    id: ID!
    body: String!
    username: String!
    ownerAvatar: String
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
}
type Comment {
  id: ID!
  username: String!
  body: String!
  createdAt: String!
}
type Like {
  id: ID!
  username: String!
  createdAt: String!
}
type User {
  id: ID!
  token: String!
  email: String!
  username: String!
  createdAt: String!
  avatar: String
}
input RegisterInput {
  username: String!
  email: String!
  password: String!
  confirmPassword: String!

}
type Query{
  getPosts: [Post]
  getPost(postId: ID!): Post
}
type Mutation{
  register(registerInput: RegisterInput): User!
  login(username: String!, password: String!): User!
  createPost(body: String!): Post!
  deletePost(postId: ID!): String!
  createComment(postId: String!, body: String!): Post!
  deleteComment(postId: ID!, commentId: ID!): Post!
  likePost(postId: ID!): Post!
}
`
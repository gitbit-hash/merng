const gql = require('graphql-tag');

module.exports = gql`
type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
}
type User {
  id: ID!
  token: String!
  email: String!
  username: String!
  createdAt: String!
}
input RegisterInput {
  username: String!
  email: String!
  password: String!
  confirmPassword: String!

}
type Query{
  getPosts: [Post]
}
type Mutation{
  register(registerInput: RegisterInput): User!
}
`
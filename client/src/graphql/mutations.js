import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput:{
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id username email createdAt token
    }
  }
`

export const LOGIN_USER = gql`
  mutation Login($username: String! $password: String!) {
    login(username: $username password: $password) {
      id 
      username 
      email 
      createdAt 
      token
    }
  }
`

export const CREATE_POST_MUTATION = gql`
mutation CreatePost($body: String!) {
  createPost(body: $body){
    id username body createdAt
    comments {
      id username body createdAt
    }
    likes{
      id username createdAt
    }
    commentCount
    likeCount
  }
}
`

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments{
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id
        username
      }
      commentCount
    }
  }
`

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes{
        id
        username
      }
    likeCount
    }
  }
`
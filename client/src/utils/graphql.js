import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
{
  getPosts{
    id
    username
    body
    createdAt
    likeCount
    commentCount
    likes{
      username
    }
    comments{
      id
      username
      body
      createdAt
    }
  }
}
`

export const FETCH_POST_QUERY = gql`
query ($postId: ID!) {
  getPost(postId: $postId) {
    id
    username
    body
    createdAt
    likeCount
    likes {
      username
    }
    commentCount
    comments{
      id 
      username 
      body 
      createdAt
    }
  }
}
`

export const DELETE_POST_MUTATION = gql`
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
`
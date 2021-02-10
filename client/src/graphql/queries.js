import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
{
  getPosts{
    id
    username
    ownerAvatar
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
    ownerAvatar
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
      ownerAvatar
      body 
      createdAt
    }
  }
}
`

export const FETCH_PROFILES_QUERY = gql`
{
  getProfiles {
    id
    username
    avatar
  }
}
`

export const FETCH_PROFILE_QUERY = gql`
query ($username: String!) {
  getUserProfile(username: $username) {
    id
    username
    avatar
    name
    bio
    location
  }
}`
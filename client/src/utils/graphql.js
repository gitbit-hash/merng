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
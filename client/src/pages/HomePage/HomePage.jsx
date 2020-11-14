import React from 'react'

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import PostCard from '../../components/PostCard/PostCard'

import { Grid } from 'semantic-ui-react'

import './homePage.styles.css';

const HomePage = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)
  if (error) return `Error! ${error.message}`

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Postss</h1>
      </Grid.Row>
      <Grid.Row>
        {
          loading ? <h1>Loading...</h1> : data && data.getPosts.map(post =>
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          )
        }

      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
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

export default HomePage;
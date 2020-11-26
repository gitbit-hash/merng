import React, { useContext } from 'react'

import { useQuery } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../../utils/graphql'

import { AuthContext } from '../../context/auth'

import PostCard from '../../components/PostCard/PostCard'
import PostForm from '../../components/PostForm/PostForm'

import { Grid, Transition } from 'semantic-ui-react'

import './HomePage.styles.css';

const HomePage = () => {
  const { user } = useContext(AuthContext)

  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)
  if (error) return `Error! ${error.message}`

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Postss</h1>
      </Grid.Row>
      <Grid.Row>
        {
          user &&
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        }
        {
          loading ? (
            <h1>Loading...</h1>
          ) : (
              <Transition.Group>
                {
                  data && data.getPosts.map(post =>
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  )
                }
              </Transition.Group>
            )
        }

      </Grid.Row>
    </Grid>
  )
}

export default HomePage;
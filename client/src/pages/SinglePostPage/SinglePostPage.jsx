import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_POST_QUERY } from '../../graphql/queries'
import { AuthContext } from '../../context/auth'

import CommentList from '../../components/CommentList/CommentList'
import Post from '../../components/Post/Post'

import { Grid, Image, Loader } from 'semantic-ui-react'

const SinglePostPage = (props) => {
  const { user } = useContext(AuthContext)

  const postId = props.match.params.postId

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  if (loading) return (
    <Loader active />
  )

  if (error) return `Error! ${error.message}`

  const {
    id,
    username,
    ownerAvatar,
    body,
    createdAt,
    likeCount,
    likes,
    commentCount,
    comments
  } = data.getPost

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src={ownerAvatar}
            size='small'
            floated='right'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Post
            user={user}
            history={props.history}
            post={
              {
                id,
                username,
                body,
                createdAt,
                likeCount,
                likes,
                commentCount
              }
            }
          />
          <CommentList postId={postId} user={user} comments={comments} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SinglePostPage

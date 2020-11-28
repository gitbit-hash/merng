import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_POST_QUERY } from '../../utils/graphql'
import { AuthContext } from '../../context/auth'
import moment from 'moment'

import LikeButton from '../../components/LikeButton/LikeButton'
import DeleteButton from '../../components/DeleteButton/DeleteButton'

import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react'

const SinglePostPage = (props) => {
  const { user } = useContext(AuthContext)

  const postId = props.match.params.postId

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  if (error) return `Error! ${error.message}`
  if (loading) return <div>Loading..</div>

  const { id, username, body, createdAt, likeCount, likes, commentCount, comments } = data.getPost

  const handleClick = () => {
    props.history.push('/')
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
            size='small'
            floated='right'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likes, likeCount }} />
              <Button
                as='div'
                labelPosition='right'
                onClick={() => console.log('like')}
              >
                <Button basic color='blue'>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
              {
                user && user.username === username && (
                  <DeleteButton postId={id} handleClick={handleClick} />
                )
              }
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SinglePostPage

import React from 'react'

import moment from 'moment'

import LikeButton from '../LikeButton/LikeButton'
import DeleteButton from '../DeleteButton/DeleteButton'

import { Button, Card, Icon, Label } from 'semantic-ui-react'

const Post = ({
  user,
  history,
  post: {
    username,
    createdAt,
    body,
    id,
    likes,
    likeCount,
    commentCount
  } }) => {

  const handleClick = () => {
    history.push('/')
  }

  return (

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
  )
}

export default Post
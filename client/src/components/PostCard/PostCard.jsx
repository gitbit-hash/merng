import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../../context/auth'

import LikeButton from '../LikeButton/LikeButton'

import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'

const PostCard = ({ post: {
  id,
  username,
  body,
  likes,
  likeCount,
  commentCount,
  createdAt
} }) => {
  const { user } = useContext(AuthContext)

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
        <Card.Header>{username}</Card.Header>
        <Card.Meta
          as={Link}
          to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={user} />
        <Button as={Link} labelPosition='right' to={`/posts/${id}`} style={{ margin: 2 }}>
          <Button color='blue' basic >
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as='div' color='red' floated='right' onClick={() => console.log('Delete Post')} >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard

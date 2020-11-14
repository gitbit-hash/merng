import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

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
  const likePost = () => {
    console.log(`like post`)
  }

  const commentOnPost = () => {
    console.log(`comment on post`)
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`} >{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='heart' />
            Like
          </Button>
          <Label basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentOnPost}>
          <Button color='blue' basic>
            <Icon name='comments' />
            Like
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard

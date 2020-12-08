import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../../context/auth'

import CommentButton from '../CommentButton/CommentButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import LikeButton from '../LikeButton/LikeButton'

import { Card, Image } from 'semantic-ui-react'

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
        <CommentButton commentCount={commentCount} id={id} />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard

import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import moment from 'moment'

import DeleteButton from '../DeleteButton/DeleteButton'

import { Card, Image } from 'semantic-ui-react'

const CommentComponent = ({
  postId,
  id,
  username,
  createdAt,
  body,
  ownerAvatar
}) => {
  const { user } = useContext(AuthContext)

  return (
    <Card fluid>
      <Card.Content >
        {
          user && user.username === username && (
            <DeleteButton commentId={id} postId={postId} />
          )
        }
        <Image
          floated='left'
          size='mini'
          src={ownerAvatar}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>
          <span>{moment(createdAt).fromNow()}</span>
        </Card.Meta>
        <br />
        <Card.Description>{body}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default CommentComponent


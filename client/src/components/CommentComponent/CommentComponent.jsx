import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import moment from 'moment'

import DeleteButton from '../DeleteButton/DeleteButton'

import { Comment } from 'semantic-ui-react'

const CommentComponent = ({ postId, id, username, createdAt, body }) => {
  const { user } = useContext(AuthContext)
  return (
    <Comment >
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
      <Comment.Content>
        <Comment.Author>{username}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(createdAt).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{body}</Comment.Text>
        {
          user && user.username === username && (
            <DeleteButton commentId={id} postId={postId} />
          )
        }
      </Comment.Content>
    </Comment>
  )
}

export default CommentComponent


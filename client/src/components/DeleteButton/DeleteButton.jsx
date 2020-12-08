import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../../graphql/queries'
import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../../graphql/mutations'

import { Button, Confirm, Icon } from 'semantic-ui-react'

const DeleteButton = ({ postId, commentId, handleClick }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const deleteMutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrComment] = useMutation(deleteMutation, {
    variables: {
      postId,
      commentId
    },
    update(proxy) {
      setIsConfirmOpen(false)

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        const newData = data.getPosts.filter(post => post.id !== postId)

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: newData
          }
        })
      }
      if (handleClick) handleClick()
    }
  })

  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setIsConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  )
}

export default DeleteButton

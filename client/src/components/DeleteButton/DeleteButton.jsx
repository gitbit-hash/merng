import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../../utils/graphql'

import { Button, Confirm, Icon } from 'semantic-ui-react'

const DeleteButton = ({ postId, handleClick }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId
    },
    update(proxy) {
      setIsConfirmOpen(false)

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      const newData = data.getPosts.filter(post => post.id !== postId)
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: newData
        }
      })
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
        onConfirm={deletePost}
      />
    </>
  )
}

export default DeleteButton

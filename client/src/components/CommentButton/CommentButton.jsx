import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Icon, Label } from 'semantic-ui-react'

const CommentButton = ({ commentCount, id }) => {
  return (
    <Button labelPosition='right'
      as={id ? Link : 'div'}
      to={`/posts/${id}`}>
      <Button color='blue' basic >
        <Icon name='comments' />
      </Button>
      <Label basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
  )
}

export default CommentButton

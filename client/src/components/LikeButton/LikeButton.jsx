import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { LIKE_POST_MUTATION } from '../../graphql/mutations'

import { Button, Label, Icon } from 'semantic-ui-react'
import './LikeButton.styles.css'

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err)
    }
  })

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
        <Button color='teal' basic>
          <Icon name='heart' />
        </Button>
      )
  ) : (
      <Button as={Link} to='/login' color='teal' basic>
        <Icon name='heart' />
      </Button>
    )

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
}

export default LikeButton

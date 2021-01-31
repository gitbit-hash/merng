import React from 'react'
import { Link } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'

const ProfileCard = ({ id, username, avatar }) => {

  return (
    <Card
      raised
      as={Link}
      to={`/profile/${id}`}
    >
      <Card.Content textAlign='center'>
        <Image
          size='small'
          wrapped
          circular
          src={avatar}
        />
      </Card.Content>
      <Card.Content textAlign='center'>
        <Card.Header>{username}</Card.Header>
      </Card.Content>
    </Card>
  )
}

export default ProfileCard

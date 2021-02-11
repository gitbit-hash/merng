import React, { useState, useContext } from 'react'

import { AuthContext } from '../../context/auth'

import { useQuery } from '@apollo/client'
import { FETCH_PROFILE_QUERY } from '../../graphql/queries'

import PuplicProfileForm from '../../components/PuplicProfileForm/PuplicProfileFrom'
import UploadImageModal from '../../components/UploadImageModal/UploadImageModal'

import { Loader, Image, Grid, Button, Segment, Divider, Menu } from 'semantic-ui-react';


const DashboardPage = () => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('profile')

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const { user: { username } } = useContext(AuthContext)

  const { loading, error, data } = useQuery(FETCH_PROFILE_QUERY, {
    variables: { username },
  })

  if (loading) return <Loader active />

  if (error) return `Error! ${error.message}`

  const { getUserProfile: { avatar, name, bio, location } } = data

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column mobile={6} tablet={2} computer={2}>
          <Image
            src={avatar}
            circular
            size='medium'
          />
        </Grid.Column>
        <Grid.Column mobile={8} tablet={6} computer={8}>
          <h3>{username}</h3>
          <p>Your personal account</p>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={6} verticalAlign='middle' textAlign='right'>
          <Button fluid compact>
            Go to your personal profile
            </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column mobile={16} tablet={6} computer={4}>
          <h4>Account settings</h4>
          <Menu
            fluid
            pointing
            secondary
            vertical
            color='teal'
          >
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={6} computer={8}>
          <PuplicProfileForm name={name} bio={bio} location={location} />
          <Divider />
        </Grid.Column>
        <Grid.Column mobile={14} tablet={4} computer={4}>
          <Segment basic>
            <Image
              fluid
              src={avatar}
              as={Button}
              basic
              onClick={() => setOpen(true)}
              label={{ attached: 'bottom', icon: 'pencil', content: 'Edit' }}
            />
          </Segment>
          <UploadImageModal setOpen={setOpen} open={open} username={username} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default DashboardPage

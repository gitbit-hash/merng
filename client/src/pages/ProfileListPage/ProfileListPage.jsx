import React from 'react'

import { useQuery } from '@apollo/client'
import { FETCH_Profiles_QUERY } from '../../graphql/queries'

import ProfileCard from '../../components/ProfileCard/ProfileCard'

import { Loader, Card } from 'semantic-ui-react'

const ProfileListPage = () => {

  const { loading, error, data } = useQuery(FETCH_Profiles_QUERY)

  if (loading) return <Loader active />

  if (error) return `Error! ${error.message}`

  return (
    <Card.Group itemsPerRow={3}>
      {
        data && data.getProfiles.map(profile => <ProfileCard key={profile.id} {...profile}></ProfileCard>)
      }
    </Card.Group>
  )

}

export default ProfileListPage

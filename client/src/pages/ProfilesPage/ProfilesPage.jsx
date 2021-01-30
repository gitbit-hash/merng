import React from 'react'

import { useQuery } from '@apollo/client'
import { FETCH_Profiles_QUERY } from '../../graphql/queries'

const ProfilesPage = () => {

  const { loading, error, data } = useQuery(FETCH_Profiles_QUERY)
  // console.log(data)
  if (loading) return `Loading...`

  if (error) return `Error! ${error.message}`


  return (
    <div>
      {
        data && data.getProfiles.map(profile => <div id={profile.id}>{profile.username}</div>)
      }
    </div>
  )

}

export default ProfilesPage

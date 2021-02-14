import React from 'react'
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { FETCH_AVATAR_QUERY } from '../../graphql/queries'

import { Dropdown, Image } from 'semantic-ui-react'

const AvatarDropdownMenu = ({ username }) => {

	const { loading, error, data } = useQuery(FETCH_AVATAR_QUERY, {
		variables: { username },
	})

	if (loading) return null

	if (error) return `Error! ${error.message}`

	const { getUserProfile: { avatar } } = data

	return (
		<Dropdown trigger={
			<Image
				avatar
				src={avatar}
			/>
		}
		>
			<Dropdown.Menu>
				<Dropdown.Item disabled>
					<span>
						Signed in as <strong>{username}</strong>
					</span>
				</Dropdown.Item>
				<Dropdown.Item as={Link} to='/dashboard'>Dashboard</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default AvatarDropdownMenu
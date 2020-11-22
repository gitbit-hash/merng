import React, { useState, useContext } from 'react'

import { AuthContext } from '../../context/auth'

import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname
  const path = pathName === '/' ? 'home' : pathName.substring(1)

  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return user ?
    (
      <Menu pointing secondary size="massive" color="teal" >
        <Menu.Item
          name={user.username}
          active={activeItem === 'home'}
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
        </Menu.Menu>
      </Menu>
    )
    :
    (
      <Menu pointing secondary size="massive" color="teal" >
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='register'
          />
        </Menu.Menu>
      </Menu>
    )

}

export default MenuBar;
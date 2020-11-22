import React, { useState, useContext } from 'react'

import { useMutation, gql } from '@apollo/client'

import { AuthContext } from '../../context/auth'

import { useForm } from "../../utils/hooks";

import { Form, Button } from 'semantic-ui-react'

import './LoginPage.styles.css'

const LoginPage = (props) => {

  const context = useContext(AuthContext)

  const initialState = {
    username: '',
    password: ''
  }

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, credentials } = useForm(loginUser, initialState)

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: credentials
  })

  function loginUser() {
    login()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          type='text'
          value={credentials.username}
          onChange={onChange}
          error={errors.username || errors.general ? true : false}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={credentials.password}
          onChange={onChange}
          error={errors.password || errors.general ? true : false}
        />
        <Button type='submit' primary>Login</Button>
      </Form>
      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {
                Object.values(errors).map((error, idx) => {
                  return <li key={idx}>{error}</li>
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

const LOGIN_USER = gql`
  mutation Login(
    $username: String!
    $password: String!
  ) {
    login(username: $username password: $password) {
      id username email createdAt token
    }
  }
`

export default LoginPage;

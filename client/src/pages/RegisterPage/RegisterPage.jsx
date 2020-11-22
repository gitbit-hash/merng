import React, { useState, useContext } from 'react'

import { AuthContext } from '../../context/auth'

import { useMutation, gql } from '@apollo/client'

import { useForm } from "../../utils/hooks";

import { Form, Button } from 'semantic-ui-react'

import './RegisterPage.styles.css'

const RegisterPage = (props) => {
  const context = useContext(AuthContext)

  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, credentials } = useForm(registerUser, initialState)

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: credentials
  })

  function registerUser() {
    register()
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
          error={errors.username ? true : false}
        />
        <Form.Input
          label='Email'
          placeholder='Email...'
          name='email'
          type='email'
          value={credentials.email}
          onChange={onChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={credentials.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password...'
          name='confirmPassword'
          type='password'
          value={credentials.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button type='submit' primary>Login</Button>
      </Form>
      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {
                Object.values(errors).map(error => (
                  <li key={error}>{error}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput:{
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id username email createdAt token
    }
  }
`

export default RegisterPage;

import React, { useState, useContext } from 'react'

import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../graphql/mutations'

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

  const { onChange, onSubmit, values } = useForm(loginUser, initialState)

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
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
          value={values.username}
          onChange={onChange}
          error={errors.username || errors.general ? true : false}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={values.password}
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

export default LoginPage;

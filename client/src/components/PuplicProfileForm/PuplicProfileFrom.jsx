import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { EDIT_PROFILE_MUTATION } from '../../graphql/mutations'

import { useForm } from '../../utils/hooks'
import { stringBuilder } from '../../utils/stringBuilder'

import { Button, Container, Form, Message, Transition } from 'semantic-ui-react'

const PuplicProfileFrom = ({ name, bio, location }) => {

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const { onSubmit, onChange, values } = useForm(editProfileCallback, { name, bio, location })

  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION, {
    variables: values,
    update() {
      setSuccessMessage('Profile updated successfully')
      setErrorMessage('')
      setVisible(true)
    },
    onError(err) {
      setErrorMessage(stringBuilder(err.graphQLErrors[0].extensions.errors))
      setVisible(true)
    }
  })

  function editProfileCallback() {
    editProfile()
  }

  return (
    <Container >
      {
        visible && errorMessage ? (
          <Transition duration={200} transitionOnMount>
            <Message
              negative
              header={errorMessage}
              onDismiss={() => setVisible(false)}
            />
          </Transition>
        ) : visible && successMessage && (
          <Transition duration={200} transitionOnMount>
            <Message
              success
              header={successMessage}
              onDismiss={() => setVisible(false)}
            />
          </Transition>

        )
      }
      <h2>Puplic profile</h2>
      <Form onSubmit={onSubmit}>
        <Form.Field >
          <Form.Input
            label='Name'
            name='name'
            type='text'
            onChange={onChange}
            value={values.name}
          />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            label='Bio'
            name='bio'
            placeholder='Tell us more about you...'
            onChange={onChange}
            value={values.bio}
            rows={3}
          />
        </Form.Field>
        <Form.Field >
          <Form.Input
            label='Location'
            name='location'
            type='text'
            onChange={onChange}
            value={values.location}
          />
        </Form.Field>

        <Button type='submit' primary>Update profile</Button>
      </Form>
    </Container>
  )
}

export default PuplicProfileFrom

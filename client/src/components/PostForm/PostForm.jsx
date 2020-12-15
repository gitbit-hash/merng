import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../../graphql/queries'
import { CREATE_POST_MUTATION } from '../../graphql/mutations'

import { useForm } from '../../utils/hooks'

import { Form, Button, Segment } from 'semantic-ui-react'

const PostForm = () => {

  const initialState = {
    body: ''
  }

  const [errors, setErrors] = useState('')

  const { onSubmit, onChange, values } = useForm(createPostCallback, initialState)

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts]
      newData = [result.data.createPost, ...newData]

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: newData
        },
      });
      values.body = '';
    },
    onError(error) {
      setErrors(error.message)
    }
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <Segment size='mini' style={{ marginBottom: 20 }}>
      <Form onSubmit={onSubmit}>
        <h1>Create a Post</h1>
        <Form.Field>
          <Form.Input
            placeholder='Type the body of the post here...'
            name='body'
            onChange={onChange}
            value={values.body}
            error={errors ? true : false}
          />
          <Button
            type='submit'
            color='teal'
            disabled={values.body.trim() === ''}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {
        error && (
          <div className='ui error message'>
            {errors}
          </div>
        )
      }
    </Segment>
  );
}

export default PostForm
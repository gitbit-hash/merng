import React from 'react'

import { gql, useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../../utils/graphql.js'

import { useForm } from '../../utils/hooks'

import { Form, Button } from 'semantic-ui-react'

const PostForm = () => {

  const initialState = {
    body: ''
  }

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
          ...data,
          getPosts: newData
        },
      });
      values.body = '';
    },
    onError(err) {
      console.log(err)
    }
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h1>Create a Post</h1>
        <Form.Field>
          <Form.Input
            placeholder='Type the body of the post here...'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' color='teal'>Submit</Button>
        </Form.Field>
      </Form>
      {
        error && (
          <div className='ui error message' style={{ marginBottom: 20 }}>
            <ul>
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )
      }
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body){
      id username body createdAt
      comments {
        id username body createdAt
      }
      likes{
        id username createdAt
      }
      commentCount
      likeCount
    }
  }
`

export default PostForm
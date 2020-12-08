import React from 'react'

import { useMutation } from '@apollo/client'
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations'

import { useForm } from "../../utils/hooks";

import CommentForm from '../CommentForm/CommentForm'
import CommentComponent from '../CommentComponent/CommentComponent'

import { Card, Transition } from 'semantic-ui-react'


const CommentList = ({ postId, user, comments }) => {

  const initialState = {
    body: ''
  }

  const { onChange, onSubmit, values } = useForm(addComment, initialState)

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId,
      body: values.body
    },
    update() {
      values.body = ''
    },
    onError(err) {
      console.log(err)
    }
  })

  function addComment() {
    createComment()
  }

  return <>
    {
      user && (
        <CommentForm
          body={values.body}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      )
    }
    <Transition.Group>
      {
        comments.map(comment => (
          <Card key={comment.id} fluid>
            <Card.Content>
              <CommentComponent postId={postId} {...comment} />
            </Card.Content>
          </Card>
        ))
      }
    </Transition.Group>
  </>
}

export default CommentList
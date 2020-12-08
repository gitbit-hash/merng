import React from 'react'

import { Button, Form } from 'semantic-ui-react'


export const CommentForm = ({ body, onChange, onSubmit }) => {
  return (
    <Form >
      <Form.Input
        name='body'
        value={body}
        onChange={onChange}
      />
      <Button
        type='submit'
        content='Add Comment'
        labelPosition='left'
        icon='edit'
        onClick={onSubmit}
        primary
        disabled={body.trim() === ''}
      />
    </Form>
  )
}

export default CommentForm

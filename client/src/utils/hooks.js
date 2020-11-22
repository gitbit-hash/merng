import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [credentials, setCredentials] = useState(initialState)

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    callback()
  }
  return {
    onChange,
    onSubmit,
    credentials
  }
}
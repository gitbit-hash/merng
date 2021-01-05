import React, { Fragment, useRef, useState } from 'react'

import { useMutation } from '@apollo/client'

import { UPLOAD_IMAGE } from '../../graphql/mutations'

import { Loader } from 'semantic-ui-react'

const UploadImage = () => {

  const inputEl = useRef(null);

  const [error, setError] = useState('')
  const [uploadedImage, setUploadedImage] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)

  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE, {
    onCompleted({ uploadImage: { filename, url } }) {
      setUploadedImage({ filename, url })
      setError('')
    },
    onError(err) {
      setError(err.message)
    }
  })

  if (loading) return <Loader active />;

  const onChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedFile({ file })
  }

  const handleClick = () => {
    uploadImage({ variables: { ...selectedFile } })
  }

  const { filename, url } = uploadedImage

  return (
    <Fragment>
      <h2>Upload Image</h2>
      {
        url && (
          <img
            src={url}
            alt={filename}
            style={{ width: '150px', height: '150px' }} />
        )
      }
      <input
        type="file"
        hidden
        ref={inputEl}
        onChange={onChange}
      />
      <button
        onClick={() => inputEl.current.click()}
      >
        Pick an Image
      </button>
      <button
        onClick={handleClick}
        disabled={!selectedFile ? true : false}
      >
        Upload Image
      </button>
      {
        error && (
          <div>
            {error}
          </div>
        )
      }
    </Fragment>
  )
}

export default UploadImage
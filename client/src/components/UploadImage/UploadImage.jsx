import React, { Fragment, useState } from 'react'

import { useMutation } from '@apollo/client'

import { UPLOAD_IMAGE } from '../../graphql/mutations'

import Avatar from 'react-avatar-edit'

import { Loader } from 'semantic-ui-react'

const UploadImage = () => {
  const [error, setError] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [preview, setPreview] = useState('')

  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE, {
    onCompleted({ uploadImage: { url } }) {
      setImageURL(url)
      setPreview('')
    },
    onError(err) {
      setError(err.message)
    }
  })

  if (loading) return <Loader active />

  const handleClick = () => {
    uploadImage({ variables: { ...croppedImage } })
  }

  const onBeforeFileLoad = e => {

    const file = e.target.files[0]
    if (!file) return

    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      setError('We only support JPG, JPEG, or PNG pictures.')
      e.target.value = ''
      return
    }

    setError('')
    setSelectedFile(file)
  }

  const onCrop = async (preview) => {
    setPreview(preview)

    try {
      const url = await fetch(preview)

      const blob = await url.blob()

      const { name, type } = selectedFile;

      const file = new File([blob], name, { type })

      setCroppedImage({ file })
    } catch (error) {
      setError(error.message)
    }
  }

  const onClose = () => {
    setPreview('')
  }

  return (
    <Fragment>
      <h2>Upload Image</h2>
      {
        imageURL && (
          <img
            alt='avatar'
            src={imageURL}
            style={{ width: '150px', height: '150px' }}
          />
        )
      }
      <Avatar
        onBeforeFileLoad={onBeforeFileLoad}
        onClose={onClose}
        onCrop={onCrop}
        width={390}
        height={295}
      />
      {
        preview &&
        <img
          alt='avatar-preview'
          src={preview}
          style={{ width: '150px', height: '150px' }}
        />
      }
      <button
        onClick={handleClick}
        disabled={!preview ? true : false}
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
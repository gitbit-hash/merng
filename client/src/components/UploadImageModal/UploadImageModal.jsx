import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { UPLOAD_IMAGE } from '../../graphql/mutations'

import Avatar from 'react-avatar-edit'
import { Button, Dimmer, Loader, Message, Modal } from 'semantic-ui-react'

const UploadImageModal = ({ setOpen, open }) => {
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE, {
    onCompleted() {
      setSelectedFile(null)
      setOpen(false)
    },
    onError(err) {
      setError(err.message)
    }
  })

  if (loading) return <Loader active inline='centered' />

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

  const onCrop = async (image64) => {

    try {
      const url = await fetch(image64)

      const blob = await url.blob()

      const { name, type } = selectedFile;

      const file = new File([blob], name, { type })

      setCroppedImage({ file })

    } catch (error) {
      setError(error.message)
    }
  }

  const onUnselectImage = () => {
    setSelectedFile(null)
    setCroppedImage(null)
  }

  const onModalClose = () => {
    setSelectedFile(null)
    setCroppedImage(null)
    setOpen(false)
  }

  const handleClick = () => {
    uploadImage({ variables: { ...croppedImage } })
  }

  return (
    <Modal
      onOpen={() => setOpen(true)}
      onClose={onModalClose}
      open={open}
      trigger={<Button style={{ display: 'none' }}>Show Modal</Button>}
      style={{
        maxWidth: '450px'
      }}
    >
      <Modal.Header>Crop your new profile picture</Modal.Header>
      <Modal.Content>
        {
          selectedFile && !croppedImage && (
            <Dimmer active>
              <Loader inverted active size='large'>
                Loading...
                </Loader>
            </Dimmer>
          )
        }
        <Avatar
          width='100%'
          height={300}
          imageWidth={285}
          onBeforeFileLoad={onBeforeFileLoad}
          onCrop={onCrop}
          onClose={onUnselectImage}
        />
      </Modal.Content>
      <Modal.Actions style={{ padding: '14px' }}>
        <Button
          fluid
          size='large'
          positive
          onClick={handleClick}
          style={{ margin: '0px 0px 10px 0px' }}
          disabled={!croppedImage ? true : false}
        >
          Set new profile picture
        </Button>
        {
          error &&
          <Message
            negative
            style={{
              textAlign: 'center'
            }}
          >
            {error}
          </Message>
        }
      </Modal.Actions>
    </Modal>
  )
}

export default UploadImageModal
import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'
import Dropzone from 'react-dropzone'

import { DropContainer, UploadMessage } from './styles'

const UploadFiles = ({ projetId }) => {
  const firebase = useContext(FirebaseContext)
  const [selectedFile, setSelectedFile] = useState(null)

  console.log('selectedProjet===========================', projetId)

  const handleChange = e => {
    console.log('ONchange', e.target.files[0])
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const postLinkFile = (url, fileName) => {
    console.log('fileName', fileName)
    firebase.database().ref(`projetFiles/${projetId}`).push({
      urlFile: url,
      fileName: fileName
    })
  }

  const uploadFile = () => {
    const storage = firebase.storage()
    console.log('storage', storage)

    const selectedRef = storage
      .ref(`files/${selectedFile.name}`)
      .put(selectedFile)

    selectedRef.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log('My error', error)
      },
      () => {
        storage
          .ref('files')
          .child(selectedFile.name)
          .getDownloadURL()
          .then(URL => {
            if (URL) {
              postLinkFile(URL, selectedFile.name)
            }
          })
      }
    )
  }

  const uploadMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>deplacer vous fichiers ici</UploadMessage>
    }
    if (isDragReject) {
      return (
        <UploadMessage type="error">Fichier n'est pas supporté</UploadMessage>
      )
    }
    return (
      <UploadMessage type="success">Laissez ici vous fichiers</UploadMessage>
    )
  }

  return (
    <div>
      <input onChange={handleChange} type="file" />
      <button onClick={uploadFile}>Upload Files</button>
      <div>
        <Dropzone accept="image/*" onDropAccepted={() => {}}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {uploadMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default UploadFiles

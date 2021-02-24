import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'
import Dropzone from 'react-dropzone'
import UploadList from '../UploadList'

import { DropContainer, UploadMessage } from './styles'

const UploadFiles = ({ projetId }) => {
  const firebase = useContext(FirebaseContext)

  const [projetID, setProjetID] = useState('')
  const [filesData, setFilesData] = useState([])
  const [newProject, setNewProject] = useState('')

  const postLinkFile = (url, fileName) => {
    console.log('fileName', fileName)

    firebase.database().ref(`projetFiles/${projetId}`).push({
      urlFile: url,
      fileName: fileName
    })

    /*  firebase
      .database()
      .ref(`projetFiles/${projetId}`)
      .on('child_added', async data => {
        const fileObject = {
          fileKey: await data.key,
          fileName: await data.val().fileName,
          fileURL: await data.val().urlFile
        }

        filesList.push(fileObject)

        console.log('filesList22222222', filesList)
        setUpdateListFiles(filesList)

        firebase.database().ref(`projetFiles/${projetId}`).off('child_added')
      }) */
  }

  const uploadFile = files => {
    const storage = firebase.storage()

    const selectedRef = storage.ref(`files/${files[0].name}`).put(files[0])

    selectedRef.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log('My error', error)
      },
      () => {
        storage
          .ref('files')
          .child(files[0].name)
          .getDownloadURL()
          .then(URL => {
            if (URL) {
              postLinkFile(URL, files[0].name)
            }
          })
      }
    )
    setNewProject('addProject')
  }

  useEffect(() => {
    const filesList = [...filesData]
    setProjetID(projetId)
    setNewProject('useEffect')
    firebase
      .database()
      .ref(`projetFiles/${projetId}`)
      .on('child_added', async data => {
        const fileObject = {
          fileKey: await data.key,
          fileName: await data.val().fileName,
          fileURL: await data.val().urlFile
        }

        filesList.push(fileObject)

        setFilesData(filesList)

        firebase.database().ref(`projetFiles/${projetId}`).off('child_added')
      })

    setFilesData([])
  }, [projetId, projetID, newProject])

  const uploadMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Deplacer vous fichiers ici</UploadMessage>
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
      <div>
        <Dropzone accept="image/*" onDropAccepted={uploadFile}>
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
      <UploadList files={filesData} />
    </div>
  )
}

export default UploadFiles

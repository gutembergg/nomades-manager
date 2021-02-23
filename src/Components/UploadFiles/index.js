import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'

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

  return (
    <div>
      <input onChange={handleChange} type="file" />
      <button onClick={uploadFile}>Upload Files</button>
    </div>
  )
}

export default UploadFiles

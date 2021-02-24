import React, { useState } from 'react'
import { MDBCollapse } from 'mdbreact'
import { BsCardList } from 'react-icons/bs'

import { Container, FilesListButton, ListFiles } from './styles'

const UploadList = ({ files }) => {
  const [toggle, setToggle] = useState(false)

  const toggleList = () => {
    setToggle(!toggle)
  }
  return (
    <>
      <FilesListButton onClick={toggleList}>
        <BsCardList className="icon_class" />
        Liste de documents
      </FilesListButton>
      <MDBCollapse isOpen={toggle}>
        <Container>
          <ListFiles>
            {files.map(file => (
              <li className="file_list" key={file.fileKey}>
                <a
                  href={file.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.fileName}
                </a>
              </li>
            ))}
          </ListFiles>
        </Container>
      </MDBCollapse>
    </>
  )
}

export default UploadList

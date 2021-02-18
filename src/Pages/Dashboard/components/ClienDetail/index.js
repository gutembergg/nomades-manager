import React, { useState } from 'react'
import { MDBCollapse } from 'mdbreact'

import { Container, ClientDetailContainer, ClientInfos } from './styles'

const ClientDetail = ({ userClientDetail }) => {
  const [addFormProjetsToggle, setAddFormProjetsToggle] = useState(false)

  const toggleForm = () => {
    setAddFormProjetsToggle(!addFormProjetsToggle)
  }
  return (
    <Container>
      <ClientDetailContainer>
        {userClientDetail.clientDetailId !== '' && (
          <ClientInfos>
            <li>{userClientDetail.clientDetailValue.name}</li>
            <li>{userClientDetail.clientDetailValue.email}</li>
            <li>{userClientDetail.clientDetailId}</li>
          </ClientInfos>
        )}

        <div>
          <button onClick={toggleForm}>Projets</button>
          <MDBCollapse isOpen={addFormProjetsToggle}>Hello world</MDBCollapse>
        </div>
      </ClientDetailContainer>
    </Container>
  )
}

export default ClientDetail

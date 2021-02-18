import React, { useState } from 'react'
import { MDBCollapse } from 'mdbreact'

import { Container, ClientInfos } from './styles'

const ClientDetail = ({ userClientDetail }) => {
  const [addFormProjetsToggle, setAddFormProjetsToggle] = useState(false)

  const toggleForm = () => {
    setAddFormProjetsToggle(!addFormProjetsToggle)
  }
  return (
    <Container>
      {userClientDetail.clientDetailId !== '' && (
        <>
          <ClientInfos>
            <li className="client_detail">
              {userClientDetail.clientDetailValue.name}
            </li>
            <li className="client_detail">
              {userClientDetail.clientDetailValue.email}
            </li>
            <li className="client_detail">{userClientDetail.clientDetailId}</li>
          </ClientInfos>
          <div>
            <button onClick={toggleForm}>Projets</button>
            <MDBCollapse isOpen={addFormProjetsToggle}>
              <form>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button>Valider</button>
              </form>
            </MDBCollapse>
          </div>
        </>
      )}
    </Container>
  )
}

export default ClientDetail

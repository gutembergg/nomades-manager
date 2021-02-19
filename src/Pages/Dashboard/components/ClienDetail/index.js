import React, { useState, useContext } from 'react'
import { MDBCollapse } from 'mdbreact'
import { FirebaseContext } from '../../../../services/Firebase/context'

import { Container, ClientInfos } from './styles'

const ClientDetail = ({ userClientDetail }) => {
  const firebase = useContext(FirebaseContext)

  const [model, setModel] = useState({
    name: '',
    description: '',
    link: ''
  })
  const [addFormProjetsToggle, setAddFormProjetsToggle] = useState(false)

  const updateModel = e => {
    setModel({
      ...model,
      [e.target.dataset.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .push({
        name: model.name,
        description: model.description,
        link: model.link
      })
  }

  console.log('model', model)

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
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  data-name="name"
                  value={model.name}
                  onChange={updateModel}
                />
                <input
                  type="text"
                  data-name="description"
                  value={model.description}
                  onChange={updateModel}
                />
                <input
                  type="text"
                  data-name="link"
                  value={model.link}
                  onChange={updateModel}
                />
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

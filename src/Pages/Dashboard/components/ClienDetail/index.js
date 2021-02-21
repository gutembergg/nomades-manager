import React, { useState } from 'react'
import { MDBCollapse } from 'mdbreact'
/* import { FirebaseContext } from '../../../../services/Firebase/context' */

import { BsPlusCircle } from 'react-icons/bs'

import { Container, AddProjetForm, AddProjetsFormTitle } from './styles'
import ScrollList from '../ScrollList'

const ClientDetail = ({
  projetModel,
  handleSubmit,
  updateProjetModel,
  userClientDetail,
  title,
  list,
  selectedDetail
}) => {
  /* const firebase = useContext(FirebaseContext) */

  /*  const [model, setModel] = useState({
    name: '',
    description: '',
    link: ''
  }) */
  const [addFormProjetsToggle, setAddFormProjetsToggle] = useState(false)

  /* const updateModel = e => {
    setModel({
      ...model,
      [e.target.dataset.name]: e.target.value
    })
  } */
  /*
  const handleSubmit = e => {
    e.preventDefault()
    const projetsList = [...listProjets]

    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .push({
        name: model.name,
        description: model.description,
        link: model.link
      })

    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .on('child_added', async data => {
        console.log('data===>>>===>>', data)
        const result = await data

        projetsList.push(result)
        console.log('projetsList', projetsList)
        setListProjets(projetsList)
      })
  } */

  const toggleForm = () => {
    setAddFormProjetsToggle(!addFormProjetsToggle)
  }

  console.log('list', list)
  return (
    <Container>
      {userClientDetail.clientDetailId !== '' && (
        <>
          <div>
            <ScrollList
              title={title}
              list={list}
              info={userClientDetail.clientDetailValue.name}
              selectedDetail={selectedDetail}
            />
            <AddProjetsFormTitle onClick={toggleForm}>
              <BsPlusCircle className="icon_plus" /> Ajouter Projets
            </AddProjetsFormTitle>
            <MDBCollapse isOpen={addFormProjetsToggle}>
              <AddProjetForm onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input_style"
                  data-name="name"
                  value={projetModel.name}
                  onChange={updateProjetModel}
                  placeholder="nom"
                />
                <input
                  type="text"
                  className="input_style"
                  data-name="description"
                  value={projetModel.description}
                  onChange={updateProjetModel}
                  placeholder="description"
                />
                <input
                  type="text"
                  className="input_style"
                  data-name="link"
                  value={projetModel.link}
                  onChange={updateProjetModel}
                  placeholder="lien du projet"
                />
                <button type="submit" className="btn_addClient">
                  Valider
                </button>
              </AddProjetForm>
            </MDBCollapse>
          </div>
        </>
      )}
    </Container>
  )
}

export default ClientDetail

import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'
import { MDBCollapse } from 'mdbreact'

import { BsPlusCircle } from 'react-icons/bs'

import { Container, AddProjetForm, AddProjetsFormTitle } from './styles'
import ScrollList from '../ScrollList'

const ClientDetail = ({
  updateProjetModel,
  projetModel,
  userClientDetail,
  handleSubmit,
  info,
  selectedDetail,
  title,
  list
}) => {
  const firebase = useContext(FirebaseContext)
  console.log(firebase)
  const [addFormProjetsToggle, setAddFormProjetsToggle] = useState(false)

  const toggleForm = () => {
    setAddFormProjetsToggle(!addFormProjetsToggle)
  }

  return (
    <Container>
      {userClientDetail.clientDetailId !== '' && (
        <>
          <div>
            <ScrollList
              title={title}
              list={list}
              info={info}
              clientCode={userClientDetail.clientDetailValue.code}
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
                <textarea
                  type="text"
                  className="input_style"
                  data-name="description"
                  value={projetModel.description}
                  onChange={updateProjetModel}
                  placeholder="description"
                  rows="3"
                  cols="30"
                ></textarea>
                <input
                  type="text"
                  className="input_style"
                  data-name="link"
                  value={projetModel.link}
                  onChange={updateProjetModel}
                  placeholder="lien du projet"
                />
                <button
                  type="submit"
                  onClick={toggleForm}
                  className="btn_addClient"
                >
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

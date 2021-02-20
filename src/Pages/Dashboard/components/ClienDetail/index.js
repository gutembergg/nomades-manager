import React, { useState, useContext } from 'react'
import { MDBCollapse } from 'mdbreact'
import { FirebaseContext } from '../../../../services/Firebase/context'

import { BsPlusCircle } from 'react-icons/bs'

import { Container, AddProjetForm, AddProjetsFormTitle } from './styles'
import ScrollList from '../ScrollList'

const ClientDetail = ({ userClientDetail, title, list, selectedDetail }) => {
  const firebase = useContext(FirebaseContext)

  const [model, setModel] = useState({
    name: '',
    description: '',
    link: ''
  })
  const [addFormProjetsToggle, setAddFormProjetsToggle] = useState(false)
  /*  const [listProjets, setListProjets] = useState([])
  const [clientId, setClientId] = useState('') */

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

  /*  useEffect(() => {
    setClientId(userClientDetail.clientDetailId)
    const list = [...listProjets]
    console.log('useEFE=====================================', list)

    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .on('child_added', async data => {
        if (data) {
          const item = await data
          list.push(item)
          console.log('listPush', list)
          setListProjets(list)
        }

        firebase
          .database()
          .ref(`clientProjets/${userClientDetail.clientDetailId}`)
          .off('child_added')
      })
    setListProjets([])
  }, [userClientDetail.clientDetailId, clientId]) */

  const toggleForm = () => {
    setAddFormProjetsToggle(!addFormProjetsToggle)
  }

  /*   const selectedDetail = id => {
    console.log('selectdProjet', id)

    const selectedProjet = listProjets.filter(projet => projet.key === id)
    console.log('selectedProjet', selectedProjet)
  } */

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
                  value={model.name}
                  onChange={updateModel}
                  placeholder="nom"
                />
                <input
                  type="text"
                  className="input_style"
                  data-name="description"
                  value={model.description}
                  onChange={updateModel}
                  placeholder="description"
                />
                <input
                  type="text"
                  className="input_style"
                  data-name="link"
                  value={model.link}
                  onChange={updateModel}
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

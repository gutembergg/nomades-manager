import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FirebaseContext } from '../../services/Firebase/context'
import ListProjet from './components/ListProjets'
import DetailProjet from './components/DetailProjet'
import Decisions from './components/DetailProjet/Decisions'

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { Container, NavBar, Image, Content } from './styles'

const ClientDashboard = props => {
  const firebase = useContext(FirebaseContext)
  const location = useLocation()
  const myparam = location.state.params

  const [userName, setUserName] = useState('')
  const [list_projets, setListProjets] = useState([])
  const [newProjet, setNewProjet] = useState(false)
  const [projetSelected, setProjetSelected] = useState(null)

  useEffect(() => {
    setNewProjet(true)
    const dataList = []
    firebase
      .database()
      .ref(`users/${myparam.userId}`)
      .once('value', userData => {
        setUserName(userData.val().name)
      })

    firebase
      .database()
      .ref(`clientProjets/${myparam.clientId}`)
      .on('child_added', projetData => {
        const result = projetData

        dataList.push(result)
        setListProjets(dataList)
      })
  }, [myparam, newProjet])

  const selectProjet = id => {
    const selectedProjet = list_projets.filter(projet => projet.key === id)
    setProjetSelected(selectedProjet)
    console.log('selectedProjet', selectedProjet[0].key)
  }

  console.log('projetSelected===========', projetSelected)

  return (
    <Container>
      <NavBar>
        <Image src={Logo} alt="logo" />
      </NavBar>

      <h4>Developper: {userName}</h4>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <ListProjet
              listProjets={list_projets}
              selectProjet={selectProjet}
            />
          </MDBCol>

          <MDBCol>
            {projetSelected && <DetailProjet projetSelected={projetSelected} />}
            {projetSelected && <Decisions projetSelected={projetSelected} />}
          </MDBCol>
          <MDBCol>List files</MDBCol>
        </MDBRow>
      </MDBContainer>

      <Content></Content>
    </Container>
  )
}

export default ClientDashboard

import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FirebaseContext } from '../../services/Firebase/context'
/* import ListProjet from './components/ListProjets'
import DetailProjet from './components/DetailProjet' */

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { Container, NavBar, Image, Content } from './styles'

const ClientDashboard = props => {
  const firebase = useContext(FirebaseContext)
  const location = useLocation()
  const myparam = location.state.params

  const [userName, setUserName] = useState('')

  useEffect(() => {
    const listProjet = []
    firebase
      .database()
      .ref(`users/${myparam.userId}`)
      .once('value', userData => {
        setUserName(userData.val().name)
      })

    firebase
      .database()
      .ref(`clientProjets/${myparam.clientId}`)
      .once('value', projeData => {
        listProjet.push(projeData.val())
        console.log('clientData', listProjet)
      })
  }, [])

  return (
    <Container>
      <NavBar>
        <Image src={Logo} alt="logo" />
      </NavBar>

      <h4>Developper: {userName}</h4>
      <MDBContainer>
        <MDBRow>
          <MDBCol>{/*  <ListProjet /> */}</MDBCol>

          <MDBCol>{/*  <DetailProjet /> */}</MDBCol>

          <MDBCol>List decisions</MDBCol>

          <MDBCol>List files</MDBCol>
        </MDBRow>
      </MDBContainer>

      <Content></Content>
    </Container>
  )
}

export default ClientDashboard

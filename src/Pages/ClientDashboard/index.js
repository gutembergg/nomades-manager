import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FirebaseContext } from '../../services/Firebase/context'
import ListProjet from './components/ListProjets'
/* import DetailProjet from './components/DetailProjet'  */

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { Container, NavBar, Image, Content } from './styles'

const ClientDashboard = props => {
  const firebase = useContext(FirebaseContext)
  const location = useLocation()
  const myparam = location.state.params

  const [userName, setUserName] = useState('')
  const [list_projets, setListProjets] = useState([])
  const [newProjet, setNewProjet] = useState(false)

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
      .on('child_added', async projetData => {
        console.log('projeeee', projetData)
        const result = await projetData

        dataList.push(result)
        console.log('LLLLIIISSSTAAA', dataList)
        setListProjets(dataList)
      })
  }, [myparam, newProjet])

  console.log('listProjets====/////', list_projets)

  return (
    <Container>
      <NavBar>
        <Image src={Logo} alt="logo" />
      </NavBar>

      <h4>Developper: {userName}</h4>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <ListProjet listProjets={list_projets} />{' '}
          </MDBCol>

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

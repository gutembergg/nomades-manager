import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FirebaseContext } from '../../services/Firebase/context'
import ListProjet from './components/ListProjets'
import DetailProjet from './components/DetailProjet'

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { Container, NavBar, Image, Content } from './styles'

const ClientDashboard = props => {
  const firebase = useContext(FirebaseContext)
  console.log('firebase', firebase)
  const location = useLocation()
  const myparam = location.state.params

  console.log('MyParams', myparam)

  const [projetsData] = useState([])
  const [selectedPjtDetail, setSelectedPjtDetail] = useState(null)

  console.log('props.location.state.', props.location.state)

  const selectProjet = id => {
    const selectedProjet = projetsData.filter(item => item.projetKey === id)
    setSelectedPjtDetail(selectedProjet)
    console.log('selectedProjet', selectedProjet)
  }

  console.log('selectedPjtDetail', selectedPjtDetail)

  return (
    <Container>
      <NavBar>
        <Image src={Logo} alt="logo" />
      </NavBar>

      <h4>Developper name</h4>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <ListProjet projets={projetsData} selectProjetFC={selectProjet} />
          </MDBCol>

          <MDBCol>
            {selectedPjtDetail && <DetailProjet projet={selectedPjtDetail} />}
          </MDBCol>

          <MDBCol>List decisions</MDBCol>

          <MDBCol>List files</MDBCol>
        </MDBRow>
      </MDBContainer>

      <Content></Content>
    </Container>
  )
}

export default ClientDashboard

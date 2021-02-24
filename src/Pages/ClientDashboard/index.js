import React, { useContext, useState, useEffect } from 'react'
import Logo from '../../assets/logo.png'
import { FirebaseContext } from '../../services/Firebase/context'
import ListProjet from './components/ListProjets'
import DetailProjet from './components/DetailProjet'

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { Container, NavBar, Image, Content } from './styles'

const ClientDashboard = () => {
  const firebase = useContext(FirebaseContext)

  const [projetsData, setProjetsData] = useState([])
  const [isData, setIsData] = useState(false)
  const [selectedPjtDetail, setSelectedPjtDetail] = useState(null)

  useEffect(() => {
    setIsData(true)
    const list = [...projetsData]
    const uidClient = '-MUDf5G3JLL4-xYFrfpX'
    firebase
      .database()
      .ref(`clientProjets/${uidClient}`)
      .on('child_added', async data => {
        const projetObject = {
          projetKey: await data.key,
          projetValues: await data.val()
        }
        list.push(projetObject)

        setProjetsData(list)
        console.log('ClientDash==============', data)
      })
  }, [isData])

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

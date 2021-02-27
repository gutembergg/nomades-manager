import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'
import { v4 as uuidv4 } from 'uuid'

import NavBar from './components/NavBar'

import { BsPlusCircle } from 'react-icons/bs'

import AddClientForm from './components/AddFormClient'
import ScrollList from './components/ScrollList'
import ClientDetail from './components/ClienDetail'

import { MDBCollapse, MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import {
  Container,
  AddClientFormTitle,
  ClientCollapse,
  ClientInfos,
  UserName,
  NotClientSelectedText,
  NotClientText
} from './styles'
import Projets from './components/Projets'

const Dashboard = () => {
  const firebase = useContext(FirebaseContext)

  const [clientModel, setClientModel] = useState({
    name: '',
    email: '',
    zoom: ''
  })
  const [addClentFormToggle, setAddClentFormToggle] = useState(false)
  const [userId, setUserId] = useState('')
  const [data, setData] = useState('')
  const [listClients, setListClients] = useState([])
  const [userClientDetail, setUserClientsdetail] = useState({
    clientDetailValue: {},
    clientDetailId: ''
  })

  // Projets/////////////////////////////////////////
  const [projetModel, setProjetModel] = useState({
    name: '',
    description: '',
    link: ''
  })
  const [listProjets, setListProjets] = useState([])
  const [clientId, setClientId] = useState('')
  const [selectedProjet, setSelectedProjet] = useState([
    {
      projetValues: {},
      projetId: ''
    }
  ])
  const [newState, setNewState] = useState('')
  /* const [newProjet, setNewProjet] = useState(false) */

  useEffect(() => {
    console.log('LIG61=======')

    firebase.auth().onAuthStateChanged(async user => {
      console.log('Pas connecté=================')
      if (user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .on('value', snap => {
            const userVal = snap.val()
            setData(userVal.name)
          })

        const uid = firebase.auth().currentUser.uid
        setUserId(uid)
      } else {
        firebase.database().ref(`users/${userId}`).off('child_added')
      }
    })
  }, [userId])

  useEffect(() => {
    setClientId(userClientDetail.clientDetailId)

    const listClients2 = []
    console.log('/////////////////=====///////////')
    firebase
      .database()
      .ref(`userClients/${userId}`)
      .on('child_added', data => {
        if (data) {
          listClients2.push(data)
          setListClients(listClients2)
        } else {
          firebase.database().ref(`users/${userId}`).off('child_added')
        }
      })
  }, [userId, data, newState])

  // select client detail ///////////////////////////////////////////
  const selectClient = id => {
    const clientDetail = listClients.filter(client => client.key === id)

    console.log('selectClient', clientDetail)
    setUserClientsdetail({
      ...userClientDetail,
      clientDetailValue: clientDetail[0].val(),
      clientDetailId: clientDetail[0].key
    })
  }

  console.log('clientDetail[0].key', userClientDetail)

  const updateClentModel = e => {
    setClientModel({
      ...clientModel,
      [e.target.dataset.name]: e.target.value
    })
  }

  const addClient = e => {
    e.preventDefault()

    const uid = firebase.auth().currentUser.uid
    const idV4 = uuidv4()

    firebase.database().ref(`userClients/${uid}`).push({
      name: clientModel.name,
      email: clientModel.email,
      zoom: clientModel.zoom,
      code: idV4
    })

    setClientModel({
      name: '',
      email: '',
      zoom: ''
    })
    setNewState(true)
    setAddClentFormToggle(!addClentFormToggle)
  }

  const toggleCollapse = () => {
    setAddClentFormToggle(!addClentFormToggle)
  }

  listClients.sort((a, b) => {
    if (a.val().name < b.val().name) {
      return -1
    }
    if (a.val().name > b.val().name) {
      return 1
    }
    return 0
  })

  /// Projets//////////////////////////////////////////////////////////////

  const updateProjetModel = e => {
    setProjetModel({
      ...projetModel,
      [e.target.dataset.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    console.log(
      'clientDetail===???===========================',
      userClientDetail.clientDetailId
    )
    const keyprojet = firebase.database().ref('clientProjets').push().key

    console.log('keyprojet', keyprojet)
    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}/${keyprojet}`)
      .set({
        name: projetModel.name,
        description: projetModel.description,
        link: projetModel.link
      })

    firebase.database().ref(`projetList/${keyprojet}`).set({
      clientId: userClientDetail.clientDetailId,
      name: projetModel.name,
      description: projetModel.description,
      link: projetModel.link
    })

    /* firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .once('child_added', async data => {
        if (data) {
          setNewProjet(true)
        }
      }) */

    setProjetModel({
      name: '',
      description: '',
      link: ''
    })
  }

  useEffect(() => {
    setClientId(userClientDetail.clientDetailId)

    const list = [...listProjets]
    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .on('child_added', async data => {
        if (data) {
          const item = await data

          console.log('DATA', data.val())
          list.push(item)

          setListProjets(list)
        }

        firebase
          .database()
          .ref(`clientProjets/${userClientDetail.clientDetailId}`)
          .off('child_added')
      })
    setListProjets([])
    setSelectedProjet({
      projetValues: '',
      projetId: ''
    })
  }, [userClientDetail.clientDetailId, clientId])

  const selectedDetail = id => {
    const selectedProjet = listProjets.filter(projet => projet.key === id)

    setSelectedProjet({
      ...selectedProjet,
      projetValues: selectedProjet[0].val(),
      projetId: selectedProjet[0].key
    })
  }

  console.log('listProjets==================', listProjets)
  /// //////////////////////////////////////////////////////////////

  return (
    <>
      <NavBar />
      <Container>
        <UserName>Dashboard - {data}</UserName>
        <MDBContainer style={{ marginTop: '60px' }}>
          <MDBRow>
            <MDBCol className="d-flex justify-content-around" size="6">
              <div>
                <ClientInfos>
                  <ScrollList
                    list={listClients}
                    selectedDetail={selectClient}
                    title="Mes clients"
                  />
                  <ClientCollapse>
                    <AddClientFormTitle onClick={toggleCollapse}>
                      <BsPlusCircle className="icon_plus" /> Ajouter Clients
                    </AddClientFormTitle>
                    <MDBCollapse isOpen={addClentFormToggle}>
                      <AddClientForm
                        onSubmit={addClient}
                        value={clientModel}
                        onChange={updateClentModel}
                      />
                    </MDBCollapse>
                  </ClientCollapse>
                </ClientInfos>
              </div>
            </MDBCol>
            <MDBCol size="6">
              <div style={{ marginLeft: '150px' }}>
                {userClientDetail.clientDetailId !== '' ? (
                  <ClientDetail
                    updateProjetModel={updateProjetModel}
                    projetModel={projetModel}
                    handleSubmit={handleSubmit}
                    userClientDetail={userClientDetail}
                    title="Projets"
                    list={listProjets}
                    info={userClientDetail.clientDetailValue.name}
                    selectedDetail={selectedDetail}
                  />
                ) : (
                  <NotClientSelectedText>
                    <NotClientText> Aucun client selectionné</NotClientText>
                  </NotClientSelectedText>
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <>
          {selectedProjet.projetId !== '' ? (
            <Projets selectedProjet={selectedProjet} />
          ) : (
            <NotClientSelectedText width="400px">
              <NotClientText> Aucun projet selectionné</NotClientText>
            </NotClientSelectedText>
          )}
        </>
      </Container>
    </>
  )
}

export default Dashboard

import React, { useEffect, useContext, useState } from 'react'
/* import emailJs from 'emailjs-com' */
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
  const [newClient, setNewClient] = useState('')
  const [new_project, setNew_project] = useState(false)

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

    /// Get users projects echeances///////////////////////////////////////////
    firebase
      .database()
      .ref('projetEtapes')
      .once('value', snapshot => {
        snapshot.forEach(snapChild => {
          console.log('=====>', snapChild.key)

          firebase
            .database()
            .ref(`projetEtapes/${snapChild.key}`)
            .once('value', data => {
              const result = Object.keys(data.toJSON())
              console.log('RESULT', result)
              result.forEach(item => {
                firebase
                  .database()
                  .ref(`projetEtapes/${snapChild.key}/${item}`)
                  .once('value', res => {
                    console.log('RES', res.key)
                    const projetKey = res.ref.parent.key
                    const echeanceDate = res.val().echeance
                    const toDay = new Date()
                    const toDayCompare = toDay.toLocaleDateString()

                    const echeance = new Date(echeanceDate)
                    const echeanceCompare = echeance.toLocaleDateString()

                    // get client ID///////////////////////////////
                    if (toDayCompare === echeanceCompare) {
                      console.log('GAGNE', projetKey)
                      firebase
                        .database()
                        .ref(`projetList/${projetKey}`)
                        .once('value', snap => {
                          console.log('SNAP==>>===>>>>', snap.val().name)
                          const projectName = snap.val().name
                          console.log('projectName', projectName)
                          const clientResponseId = snap.val().clientId

                          firebase
                            .database()
                            .ref('userClients')
                            .once('value', client => {
                              console.log('CLIENT', client.val())
                              const res2 = client.val()
                              const response = Object.keys(res2)
                              response.forEach(userId => {
                                firebase
                                  .database()
                                  .ref(`userClients/${userId}`)
                                  .once('value', userClient => {
                                    console.log('userClient', userClient.val())
                                    const userClientValues = userClient.val()
                                    const idClient = Object.keys(
                                      userClientValues
                                    )
                                    console.log('idClient', idClient)
                                    idClient.forEach(id => {
                                      if (clientResponseId === id) {
                                        firebase
                                          .database()
                                          .ref(`users/${userClient.key}`)
                                          .once('value', val => {
                                            /*  sendEmail(
                                              val.val().email,
                                              projectName
                                            ) */
                                            console.log('ok')
                                          })
                                      }
                                    })
                                  })
                              })
                            })
                        })
                    } else {
                      console.log('Pas gangne')
                    }
                  })
              })
            })
        })
      })

    /// ///////////////////////////////////////////////////////////////////////
  }, [userId])

  /*  const sendEmail = (email, projectName) => {
    const emailParams = {
      from_name: 'ProjetManager',
      to_name: email,
      message: `vous êtes arrivé a la écheance pour le projet: ${projectName}`,
      reply_to: email
    }
    emailJs
      .send(
        'service_xtxdh99',
        'template_pphabso',
        emailParams,
        'user_m6Vr8tTl3nxIGbi1Dkr9t'
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
        }
      )
  } */

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
    console.log('selectClient============', id)

    console.log('selectClient', clientDetail)
    setUserClientsdetail({
      ...userClientDetail,
      clientDetailValue: clientDetail[0].val(),
      clientDetailId: clientDetail[0].key
    })
    setNewClient(id)
    setListProjets([])
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
    setNew_project(true)
    setProjetModel({
      name: '',
      description: '',
      link: ''
    })
  }

  useEffect(() => {
    console.log('======AQUI======')
    const list = []
    /* setClientId(userClientDetail.clientDetailI) */

    firebase
      .database()
      .ref(`clientProjets/${userClientDetail.clientDetailId}`)
      .on('child_added', data => {
        if (data) {
          const item = data

          list.push(item)
          console.log('LISTE===>', list)
          setListProjets(list)
        } else {
          firebase
            .database()
            .ref(`clientProjets/${userClientDetail.clientDetailId}`)
            .off('child_added')
        }
      })

    setSelectedProjet({
      projetValues: '',
      projetId: ''
    })
  }, [userClientDetail.clientDetailId, clientId, newClient, new_project])

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

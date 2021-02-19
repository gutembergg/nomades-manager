import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'

import AddClientForm from './components/AddFormClient'
import ScrollList from './components/ScrollList'
import ClientDetail from './components/ClienDetail'

import { MDBCollapse, MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import {
  Container,
  AddClientFormTitle,
  ClientCollapse,
  ClientInfos,
  UserName
} from './styles'

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

  useEffect(() => {
    const list = [...listClients]

    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .on('value', snap => {
            const userVal = snap.val()
            console.log('snap', userVal.name)
            setData(userVal.name)
          })

        firebase
          .database()
          .ref(`userClients/${user.uid}`)
          .on('child_added', async data => {
            if (data) {
              const result = await data
              list.push(result)
              console.log('list==>', list)

              setListClients(list)
            }
          })
      } else {
        console.log('not user')
      }
      const uid = firebase.auth().currentUser.uid
      setUserId(uid)

      firebase.database().ref(`users/${user.uid}`).off('child_added', listener)
    })
  }, [userId, data])

  // select client detail ///////////////////////////////////////////
  const selectClient = id => {
    const clientDetail = listClients.filter(client => client.key === id)

    setUserClientsdetail({
      ...userClientDetail,
      clientDetailValue: clientDetail[0].val(),
      clientDetailId: clientDetail[0].key
    })
  }

  const updateClentModel = e => {
    setClientModel({
      ...clientModel,
      [e.target.dataset.name]: e.target.value
    })
  }

  const addClient = e => {
    e.preventDefault()

    const uid = firebase.auth().currentUser.uid

    firebase.database().ref(`userClients/${uid}`).push({
      name: clientModel.name,
      email: clientModel.email,
      zoom: clientModel.zoom
    })

    setClientModel({
      name: '',
      email: '',
      zoom: ''
    })
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

  return (
    <>
      <Container>
        <UserName>Dashboard - {data}</UserName>
        <MDBContainer style={{ marginTop: '60px' }}>
          <MDBRow>
            <MDBCol className="d-flex justify-content-around" size="6">
              <div>
                <ClientInfos>
                  <ScrollList
                    listClient={listClients}
                    selectClient={selectClient}
                  />
                  <ClientCollapse>
                    <AddClientFormTitle onClick={toggleCollapse}>
                      Ajouter client
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
                <ClientDetail userClientDetail={userClientDetail} />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Container>
    </>
  )
}

export default Dashboard

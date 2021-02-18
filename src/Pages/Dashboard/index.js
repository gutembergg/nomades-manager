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
  Content1,
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
      } else {
        console.log('not user')
      }
      const uid = firebase.auth().currentUser.uid
      setUserId(uid)

      firebase.database().ref(`users/${user.uid}`).off('child_added', listener)
    })
  }, [userId])

  /// User Clients ////////////////////////////////////////////////////////////////
  useEffect(() => {
    const list = [...listClients]

    console.log('userIDScroll', userId)

    firebase
      .database()
      .ref(`userClients/${userId}`)
      .on('child_added', async data => {
        if (data) {
          const result = await data

          list.push(result)
        }
      })
    setListClients(list)

    firebase.database().ref('userClients').off('child_added')
  }, [userId])

  const selectClient = id => {
    const clientDetail = listClients.filter(client => client.key === id)

    console.log('clientDetail==>>', clientDetail[0].key)

    setUserClientsdetail({
      ...userClientDetail,
      clientDetailValue: clientDetail[0].val(),
      clientDetailId: clientDetail[0].key
    })
  }

  /// ////////////////////////////////////////////////////////////

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
  }

  const toggleCollapse = () => {
    setAddClentFormToggle(!addClentFormToggle)
  }

  console.log('userClientDetailDash', userClientDetail)

  return (
    <>
      <Container>
        <UserName>Dashboard - {data}</UserName>
        <Content1>
          <ClientInfos>
            <ScrollList listClient={listClients} selectClient={selectClient} />
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
          <ClientDetail userClientDetail={userClientDetail} />
        </Content1>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="d-flex justify-content-around" size="6">
              .col-4
            </MDBCol>
            <MDBCol className="d-flex justify-content-around" size="6">
              .col-4
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Container>
    </>
  )
}

export default Dashboard

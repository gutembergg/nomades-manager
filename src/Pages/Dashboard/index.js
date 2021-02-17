import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'

import AddClientForm from './components/AddFormClient'
import ScrollList from './components/ScrollList'

import { MDBCollapse } from 'mdbreact'

import { Container, AddClientFormTitle, ClientList } from './styles'

const Dashboard = () => {
  const firebase = useContext(FirebaseContext)

  /*   const [data, setData] = useState() */
  const [clientModel, setClientModel] = useState({
    name: '',
    email: '',
    zoom: ''
  })
  const [addClentFormToggle, setAddClentFormToggle] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .on('value', snap => {
            const user2 = snap.val()
            console.log('snap', user2.name)
            /*  setData(snap.val()) */
          })
      } else {
        console.log('not user')
      }
      const uid = firebase.auth().currentUser.uid
      setUserId(uid)

      firebase.database().ref(`users/${user.uid}`).off('child_added', listener)
    })
  }, [])
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

  console.log('==>user==>', userId)

  return (
    <Container>
      Dashboard -
      <ClientList>
        <AddClientFormTitle onClick={toggleCollapse}>
          Ajouter client
        </AddClientFormTitle>
        <MDBCollapse id="basicCollapse" isOpen={addClentFormToggle}>
          <AddClientForm
            onSubmit={addClient}
            value={clientModel}
            onChange={updateClentModel}
          />
        </MDBCollapse>
      </ClientList>
      <ScrollList userId={userId} />
    </Container>
  )
}

export default Dashboard

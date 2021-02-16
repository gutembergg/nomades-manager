import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'

import AddClientForm from './components/AddFormClient'
import ScrollList from './components/ScrollList'

import { MDBCollapse } from 'mdbreact'

import { Container, AddClientFormTitle } from './styles'

const Dashboard = () => {
  const firebase = useContext(FirebaseContext)

  const [data, setData] = useState()
  const [clientModel, setClientModel] = useState({
    name: '',
    email: '',
    zoom: ''
  })
  const [addClentFormToggle, setAddClentFormToggle] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      console.log('===>>>>', user)
      if (user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .on('child_added', async snap => {
            console.log('snap', await snap.val())
            setData(snap.val())
          })
      } else {
        console.log('not user')
      }
      const uid = firebase.auth().currentUser.uid
      setUserId(uid)
      console.log('uid', uid)

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
      Dashboard -{data}
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
      <ScrollList userId={userId} />
    </Container>
  )
}

export default Dashboard

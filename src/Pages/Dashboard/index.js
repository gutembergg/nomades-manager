import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../services/Firebase/context'

import { Container } from './styles'

const Dashboard = () => {
  const firebaseContext = useContext(FirebaseContext)
  const [userSession, setUserSession] = useState(null)
  const [data, setData] = useState()

  console.log('{userSession.uid', userSession)

  useEffect(() => {
    const listener = firebaseContext.auth().onAuthStateChanged(user => {
      user ? setUserSession(user) : history.push('/')

      firebaseContext
        .database()
        .ref(`users/${user.uid}`)
        .on('child_added', snap => {
          const snapData = snap.val().name
          console.log('snapData', snapData)
          setData(snapData)
        })
    })

    return () => {
      listener()
    }
  }, [])
  console.log('snapDaata', userSession)

  return <Container>Dashboard{data}</Container>
}

export default Dashboard

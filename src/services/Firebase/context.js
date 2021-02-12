import React, { createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyAO5cS5vP3ihmaBzX5uwoAhi1ZzR3Ck06I',
  authDomain: 'manager-f1ac5.firebaseapp.com',
  databaseURL: 'https://manager-f1ac5-default-rtdb.firebaseio.com',
  projectId: 'manager-f1ac5',
  storageBucket: 'manager-f1ac5.appspot.com',
  messagingSenderId: '258533374053',
  appId: '1:258533374053:web:0e4bccdfa0a96a488d2e8c'
}

const appFirebase = firebase.initializeApp(config)

export const FirebaseContext = createContext(null)

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={appFirebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider

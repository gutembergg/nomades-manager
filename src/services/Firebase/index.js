import React from 'react'
import FirebaseProvider from '../Firebase/context'

const AppDBProvider = ({ children }) => {
  return <FirebaseProvider>{children}</FirebaseProvider>
}

export default AppDBProvider

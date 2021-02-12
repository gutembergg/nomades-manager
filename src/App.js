import React from 'react'
import GlobalStyle from './styles/global'
import AppDBProvider from './services/Firebase'

import './services/Firebase/firebase'

import Routes from './routes'

const App = () => {
  return (
    <>
      <AppDBProvider>
        <Routes />
      </AppDBProvider>
      <GlobalStyle />
    </>
  )
}

export default App

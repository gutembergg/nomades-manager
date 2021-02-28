import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../../../../services/Firebase/context'
import Switch from 'react-switch'

import Logo from '../../../../assets/logo.png'

import { Container, Image, Icon } from './styles'

const NavBar = () => {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <Container>
      <div>
        <Image src={Logo} alt="Logo" />
      </div>
      <Icon>
        <Switch
          height={25}
          onColor="#00e676"
          onChange={signOut}
          checked={true}
        />
      </Icon>
    </Container>
  )
}

export default NavBar

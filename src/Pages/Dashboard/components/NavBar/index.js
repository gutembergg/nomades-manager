import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../../../../services/Firebase/context'

import Logo from '../../../../assets/logo.png'
import { BsGearFill } from 'react-icons/bs'

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
        <button onClick={signOut}>SignOut</button>
        <BsGearFill color="#fff" />
      </Icon>
    </Container>
  )
}

export default NavBar

import React from 'react'

import Logo from '../../../../assets/logo.png'
import { BsGearFill } from 'react-icons/bs'

import { Container, Image, Icon } from './styles'

const NavBar = () => {
  return (
    <Container>
      <div>
        <Image src={Logo} alt="Logo" />
      </div>
      <Icon>
        <BsGearFill color="#fff" />
      </Icon>
    </Container>
  )
}

export default NavBar

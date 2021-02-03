import React from 'react'
import Logo from '../../assets/logo.png'
import colors from '../../styles/colors'

import { Container, ContentCard, StartButton } from './styles'

const Home = () => {
  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <ContentCard>
        <StartButton>DevLogin</StartButton>
        <StartButton color={colors.black} background={colors.primary}>
          ClientLogin
        </StartButton>
      </ContentCard>
    </Container>
  )
}

export default Home

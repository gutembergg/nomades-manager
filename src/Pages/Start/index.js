import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import colors from '../../styles/colors'
import { FaCode, FaUsers } from 'react-icons/fa'

import { Container, ContentCard, StartButton } from './styles'

const Home = () => {
  const history = useHistory()

  const navigate = useCallback(
    path => {
      history.push(path)
    },
    [history]
  )

  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <ContentCard>
        <StartButton onClick={() => navigate('/sigin/client')}>
          <FaUsers size={50} />
          <span>Entrer comme Client</span>
        </StartButton>
        <StartButton
          onClick={() => navigate('/sigin/dev')}
          color={colors.black}
          background={colors.primary}
        >
          <FaCode size={50} />

          <span>Entrer comme Dev</span>
        </StartButton>
      </ContentCard>
    </Container>
  )
}

export default Home

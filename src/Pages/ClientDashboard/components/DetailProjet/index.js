import React, { useContext } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'

import { Container } from './styles'

const DetailProjet = ({ projetSelected }) => {
  const firebase = useContext(FirebaseContext)
  console.log('firebase', firebase)

  const result = projetSelected[0].val()
  console.log('projetSelected', result)

  return (
    <Container>
      <p style={{ color: '#fff' }}>{projetSelected[0].val().name}</p>
    </Container>
  )
}

export default DetailProjet

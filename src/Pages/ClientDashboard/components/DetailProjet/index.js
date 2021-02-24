import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'

import { Container } from './styles'

const DetailProjet = ({ projet }) => {
  const firebase = useContext(FirebaseContext)

  const [decisions, setDecisions] = useState([])

  useEffect(() => {
    const list = [...decisions]
    firebase
      .database()
      .ref(`projetDecisions/${projet[0]?.projetKey}`)
      .on('child_added', async data => {
        console.log('DETAIL=====', await data)

        const decisionObject = {
          decisionKey: await data.key,
          decisionValues: await data.val()
        }

        list.push(decisionObject)
        setDecisions(list)
      })
  }, [projet[0]?.projetKey])

  console.log('useState==decisions', decisions)

  return (
    <Container>
      <p style={{ color: '#fff' }}>{projet[0]?.projetValues.name}</p>
    </Container>
  )
}

export default DetailProjet

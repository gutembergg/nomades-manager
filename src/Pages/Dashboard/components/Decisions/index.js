import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'

import { Container, Form, TitleForm, ButtonTextArea } from './styles'

const Decisions = ({ selectedProjet }) => {
  const [decision, setDecision] = useState('')
  const firebase = useContext(FirebaseContext)

  const handleChange = e => {
    setDecision(e.target.value)
    console.log('gggg', e.target.value)
  }

  console.log('decision7////', decision)

  const handleSubmit = e => {
    e.preventDefault()

    const toDay = new Date()
    const toDayFormat = toDay.toLocaleDateString()
    firebase.database().ref(`projetDecisions/${selectedProjet.projetId}`).push({
      createdAt: toDayFormat,
      decision: 'hghgh'
    })
  }
  return (
    <Container>
      <TitleForm>Creer décisions</TitleForm>
      <Form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          className="area_decision"
          name="decision"
          cols="41"
          rows="5"
        ></textarea>
      </Form>
      <ButtonTextArea>Valider</ButtonTextArea>
    </Container>
  )
}

export default Decisions

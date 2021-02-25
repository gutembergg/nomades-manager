import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'

import { BsCardList } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FcApproval } from 'react-icons/fc'
import { MDBCollapse } from 'mdbreact'

import {
  Container,
  Form,
  TitleForm,
  ButtonTextArea,
  DecisionsList,
  ListDecision
} from './styles'

const Decisions = ({ selectedProjet }) => {
  const firebase = useContext(FirebaseContext)

  const [decision, setDecision] = useState('')
  const [listDecisions, setListDecision] = useState([])

  /// //////////////////////////////////////////
  const [projectId, setProjectId] = useState('')
  const [newPeoject, setNewProject] = useState(false)
  /// ///////////////////////////////////////
  const [toggle, setToggle] = useState(false)

  const handleChange = e => {
    setDecision(e.target.value)
    console.log('gggg', e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const toDay = new Date()
    const toDayFormat = toDay.toLocaleDateString()

    if (decision !== '') {
      firebase
        .database()
        .ref(`projetDecisions/${selectedProjet.projetId}`)
        .push({
          createdAt: toDayFormat,
          decision: decision,
          status: 'active'
        })
    } else {
      return
    }

    setDecision('')

    firebase
      .database()
      .ref(`projetDecisions/${selectedProjet.projetId}`)
      .on('child_added', async data => {
        setNewProject(true)
      })
  }

  useEffect(() => {
    setProjectId(selectedProjet.projetId)
    const list = [...listDecisions]
    firebase
      .database()
      .ref(`projetDecisions/${selectedProjet.projetId}`)
      .on('child_added', async data => {
        const decisionValue = await data.val()
        const decisionID = await data.key

        const decisionObject = {
          decisionKey: decisionID,
          decisionValues: decisionValue
        }

        list.push(decisionObject)

        setListDecision(list)

        firebase
          .database()
          .ref(`projetDecisions/${selectedProjet.projetId}`)
          .off('child_added')
      })

    setListDecision([])
  }, [selectedProjet.projetId, projectId, newPeoject])
  const toggleList = () => {
    setToggle(!toggle)
  }

  return (
    <Container>
      <TitleForm>Creer décisions</TitleForm>
      <Form onSubmit={handleSubmit}>
        <textarea
          value={decision}
          onChange={handleChange}
          className="area_decision"
          name="decision"
          cols="41"
          rows="5"
        ></textarea>
        <ButtonTextArea type="submit">Valider</ButtonTextArea>
      </Form>

      <ListDecision onClick={toggleList}>
        <BsCardList className="icon_decision" />
        Liste de decisions
      </ListDecision>
      <MDBCollapse isOpen={toggle}>
        {listDecisions.length !== 0 && (
          <DecisionsList>
            {listDecisions.map(decision => (
              <li className="decisions_list" key={decision.decisionKey}>
                <span className="decision_date">
                  {decision.decisionValues.createdAt}:
                  {decision.decisionValues?.status === 'active' ? (
                    <AiFillInfoCircle
                      className="icon_decision"
                      color="#FF0000"
                    />
                  ) : (
                    <FcApproval size={20} className="icon_decision" />
                  )}
                </span>
                {decision.decisionValues.decision}
              </li>
            ))}
          </DecisionsList>
        )}
      </MDBCollapse>
    </Container>
  )
}

export default Decisions

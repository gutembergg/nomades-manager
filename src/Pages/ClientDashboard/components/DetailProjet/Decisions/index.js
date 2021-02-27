import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../../../../services/Firebase/context'
import { MDBCollapse } from 'mdbreact'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FcApproval } from 'react-icons/fc'
import { BsCardList } from 'react-icons/bs'

import { Container, ListTitle } from './styles'

const Decisions = ({ projetSelected }) => {
  const firebase = useContext(FirebaseContext)

  const [decisionData, setDecisionData] = useState([])
  const [newProjet, setNewProjet] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [validDecision, setValidDecision] = useState('')

  console.log('projetSelected[0].key', projetSelected[0].key)

  useEffect(() => {
    setNewProjet(true)
    const listProjets = []
    firebase
      .database()
      .ref(`projetDecisions/${projetSelected[0].key}`)
      .on('child_added', data => {
        if (data) {
          const result = data
          listProjets.push(result)

          setDecisionData(listProjets)
        } else {
          firebase
            .database()
            .ref(`projetDecisions/${projetSelected[0].key}`)
            .off('child_added')
        }
      })
    setDecisionData([])
  }, [projetSelected[0].key, newProjet])

  const toggleListDecisions = () => {
    setToggle(!toggle)
  }

  const validateDecision = id => {
    firebase
      .database()
      .ref(`projetDecisions/${projetSelected[0].key}/${id}`)
      .update({
        status: 'valide'
      })
    setValidDecision(id)
  }

  return (
    <>
      <div>
        <ListTitle onClick={toggleListDecisions}>
          <BsCardList className="icon_list" /> liste de décisions
        </ListTitle>
        <MDBCollapse isOpen={toggle}>
          <Container>
            <ul>
              {decisionData.map(item => (
                <li className="decisions_list" key={item.key}>
                  <span>
                    {item.val().status === 'valide' ||
                    validDecision === item.key ? (
                      <FcApproval className="icon_decision" />
                    ) : (
                      <AiFillInfoCircle
                        className="icon_decision"
                        color="#FF0000"
                        onClick={() => validateDecision(item.key)}
                      />
                    )}
                  </span>
                  {item.val().decision}
                </li>
              ))}
            </ul>
          </Container>
        </MDBCollapse>
      </div>
    </>
  )
}

export default Decisions

import React, { useState, useCallback, useContext } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'
import { BsPlusCircle } from 'react-icons/bs'
import { MDBCollapse } from 'mdbreact'

import { NavBarCreateStep, Input_block } from './styles'

const Etapes = ({ projetId }) => {
  const firebase = useContext(FirebaseContext)

  const [toggle, setToggle] = useState(false)
  const [etapeModel, setEtapeModel] = useState({
    description: '',
    echeance: '',
    rappel: ''
  })
  console.log('projetId', projetId.projetId)

  const updateEtapeModel = useCallback(
    e => {
      setEtapeModel({
        ...etapeModel,
        [e.target.dataset.id]: e.target.value
      })
    },
    [etapeModel]
  )

  const handleEtapeSubmit = useCallback(
    e => {
      e.preventDefault()

      firebase.database().ref(`projetEtapes/${projetId.projetId}`).push({
        status: 'active',
        description: etapeModel.description,
        echeance: etapeModel.echeance,
        rappel: etapeModel.rappel
      })
    },
    [etapeModel]
  )

  const toggleFrom = () => {
    setToggle(!toggle)
  }

  console.log('etapeModel', etapeModel)
  return (
    <>
      <NavBarCreateStep onClick={toggleFrom}>
        <BsPlusCircle className="icon_etape" />
        Etapes
      </NavBarCreateStep>
      <MDBCollapse isOpen={toggle}>
        <Input_block onSubmit={handleEtapeSubmit}>
          <textarea
            data-id="description"
            value={etapeModel.description}
            onChange={updateEtapeModel}
            rows="3"
            cols="30"
            placeholder="description d'étape"
            className="input_projet"
          ></textarea>
          échéance
          <input
            data-id="echeance"
            type="date"
            value={etapeModel.echeance}
            onChange={updateEtapeModel}
            className="input_projet"
          />
          rappel
          <input
            data-id="rappel"
            type="date"
            value={etapeModel.rappel}
            onChange={updateEtapeModel}
            className="input_projet"
          />
          <button type="submit" className="btn_etape">
            Valider
          </button>
        </Input_block>
      </MDBCollapse>
    </>
  )
}

export default Etapes

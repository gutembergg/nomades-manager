import React, { useState, useCallback, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'
import { BsPlusCircle } from 'react-icons/bs'
import { MDBCollapse } from 'mdbreact'
import EtapesCard from './Etapes_card'

import { NavBarCreateStep, Input_block } from './styles'
import './styles_css.css'

const Etapes = ({ selectedProjet }) => {
  const firebase = useContext(FirebaseContext)

  const [toggle, setToggle] = useState(false)
  const [etapeModel, setEtapeModel] = useState({
    description: '',
    echeance: '',
    rappel: ''
  })
  const [etapes, setEtapes] = useState([])
  const [projet_id, setProjet_id] = useState('')

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

      firebase.database().ref(`projetEtapes/${selectedProjet.projetId}`).push({
        status: 'active',
        description: etapeModel.description,
        echeance: etapeModel.echeance,
        rappel: etapeModel.rappel
      })
    },
    [etapeModel]
  )

  useEffect(() => {
    const etapesList = [...etapes]
    setProjet_id(selectedProjet.projetId)

    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}`)
      .on('child_added', async data => {
        if (data) {
          const result = await data
          const etapeDate = await data.val().echeance

          console.log('EmailNotifications', etapeDate)
          etapesList.push(result)

          setEtapes(etapesList)
        }

        firebase
          .database()
          .ref(`projetEtapes/${selectedProjet.projetId}`)
          .off('child_added')
      })

    setEtapes([])
  }, [selectedProjet.projetId, projet_id])

  const toggleFrom = () => {
    setToggle(!toggle)
  }

  return (
    <>
      {etapes.length !== 0 && (
        <EtapesCard etapes={etapes} projet_id={projet_id} />
      )}

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
            disabled={etapes.length > 0}
          ></textarea>
          échéance
          <input
            data-id="echeance"
            type="date"
            value={etapeModel.echeance}
            onChange={updateEtapeModel}
            className="input_projet"
            disabled={etapes.length > 0}
          />
          rappel
          <input
            data-id="rappel"
            type="date"
            value={etapeModel.rappel}
            onChange={updateEtapeModel}
            className="input_projet"
            disabled={etapes.length > 0}
          />
          <button
            type="submit"
            className="btn_etape"
            disabled={etapes.length > 0}
          >
            Valider
          </button>
        </Input_block>
      </MDBCollapse>
    </>
  )
}

export default Etapes

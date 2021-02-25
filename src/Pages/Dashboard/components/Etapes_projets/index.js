import React, { useState, useCallback, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'
import { BsPlusCircle } from 'react-icons/bs'
import { MDBCollapse } from 'mdbreact'
import EtapesCard from './Etapes_card'
import EtapesList from './components/EtapesList'

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
  const [newEtape, setNewEtape] = useState('')

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

      setNewEtape('added')
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
          /*  const etapeDate = await data.val().echeance */

          etapesList.push(result)

          setEtapes(etapesList)
        }

        firebase
          .database()
          .ref(`projetEtapes/${selectedProjet.projetId}`)
          .off('child_added')
      })

    setEtapes([])
  }, [selectedProjet.projetId, projet_id, newEtape])

  console.log('///etapes///', etapes)

  const etapesFilter = etapes.filter(item => item.val().status === 'active')

  const toggleFrom = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <EtapesCard etapes={etapes} selectedProjet={selectedProjet} />

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
            disabled={etapesFilter.length === 1}
          ></textarea>
          échéance
          <input
            data-id="echeance"
            type="date"
            value={etapeModel.echeance}
            onChange={updateEtapeModel}
            className="input_projet"
            disabled={etapesFilter.length === 1}
          />
          rappel
          <input
            data-id="rappel"
            type="date"
            value={etapeModel.rappel}
            onChange={updateEtapeModel}
            className="input_projet"
            disabled={etapesFilter.length === 1}
          />
          <button
            type="submit"
            className="btn_etape"
            disabled={etapesFilter.length === 1}
          >
            Valider
          </button>
        </Input_block>
      </MDBCollapse>
      <EtapesList list={etapes} />
    </>
  )
}

export default Etapes

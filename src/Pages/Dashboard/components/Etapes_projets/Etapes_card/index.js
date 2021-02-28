import React, { useState, useContext, useEffect } from 'react'
import Switch from 'react-switch'
import { FirebaseContext } from '../../../../../services/Firebase/context'

import {
  EtapeTitle,
  Title,
  StatusBar,
  DescriptionEtape,
  Button
} from './styles'

const EtapesCard = ({ selectedProjet }) => {
  const firebase = useContext(FirebaseContext)

  const [steps, setSteps] = useState([])
  const [switchComponent, setSwitchComponent] = useState(false)
  const [projetId, setProjetId] = useState('')
  const [validateEtape, setValidateEtape] = useState(false)

  /// Validate steps/////////////////////////////////////////
  const validerEtape = id => {
    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}/${id}`)
      .remove()

    setValidateEtape(true)
  }

  useEffect(() => {
    setProjetId(selectedProjet.projetId)

    const listener = firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}`)
      .on('child_added', async data => {
        if (data) {
          const result = {
            etapeId: await data.key,
            etapeValues: await data.val()
          }

          if (data.val().status === 'active') {
            setSwitchComponent(true)
          }

          setSteps(result)
        }
        firebase
          .database()
          .ref(`projetEtapes/${selectedProjet.projetId}`)
          .off('child_added', listener)
      })
    setSteps('')

    return () => {
      firebase
        .database()
        .ref(`projetEtapes/${selectedProjet.projetId}`)
        .off('child_added', listener)
    }
  }, [projetId, selectedProjet.projetId])

  const onChangeStatus = id => {
    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}/${id}`)
      .update({
        status: switchComponent ? 'stopped' : 'active'
      })
    setSwitchComponent(!switchComponent)
  }

  return (
    <div style={{ color: '#fff' }}>
      <div>
        {steps.length !== 0 && validateEtape === false ? (
          <>
            <EtapeTitle>
              <Title>Étape</Title>
              <div>
                <StatusBar style={{ marginRight: '7px' }}>
                  <span style={{ marginRight: '7px' }}>
                    {switchComponent ? 'Active' : 'En arret'}
                  </span>

                  <Switch
                    height={25}
                    onColor="#00e676"
                    onChange={() => onChangeStatus(steps.etapeId)}
                    checked={switchComponent}
                  />
                </StatusBar>
              </div>
            </EtapeTitle>

            <DescriptionEtape>
              <div>
                <div>{steps.etapeValues?.description}</div>
                <Button onClick={() => validerEtape(steps.etapeId)}>
                  Valider Étape
                </Button>
              </div>
            </DescriptionEtape>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default EtapesCard

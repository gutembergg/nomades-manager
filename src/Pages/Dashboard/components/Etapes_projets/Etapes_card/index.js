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

  console.log('projet_id', selectedProjet.projetValues?.description)

  const onChangeStatus = id => {
    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}/${id}`)
      .update({
        status: switchComponent ? 'stopped' : 'active'
      })
    setSwitchComponent(!switchComponent)
  }

  /// Validate steps/////////////////////////////////////////
  const validerEtape = id => {
    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}/${id}`)
      .remove()
  }

  firebase
    .database()
    .ref(`projetEtapes/${selectedProjet.projetId}`)
    .once('child_moved', async data => {
      const result = await data
      console.log('(//////////////)))))))))', result)
    })
  /// 0000000000000000000000000000000000000000000000000000000000
  firebase
    .database()
    .ref(`projetEtapes/${selectedProjet.projetId}`)
    .on('child_changed', data => {
      if (data) {
        console.log('child_changed', data.val().description)
      }
      firebase
        .database()
        .ref(`projetEtapes/${selectedProjet.projetId}`)
        .off('child_changed')
    })

  /// 0000000000000000000000000000000000000000000000000000000000

  useEffect(() => {
    setProjetId(selectedProjet.projetId)

    const listener = firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}`)
      .on('child_added', async data => {
        console.log('DDDAAATTTAA', data.val())
        if (data) {
          const result = {
            etapeId: await data.key,
            etapeValues: await data.val()
          }

          if (data.val().status === 'active') {
            setSwitchComponent(true)
          }

          setSteps(result)

          console.log('RESULT', result)
        }
        firebase
          .database()
          .ref(`projetEtapes/${selectedProjet.projetId}`)
          .off('child_added', listener)
      })

    return () => {
      firebase
        .database()
        .ref(`projetEtapes/${selectedProjet.projetId}`)
        .off('child_added', listener)
    }
  }, [projetId, selectedProjet.projetId])

  console.log('steps', steps)

  return (
    <div style={{ color: '#fff' }}>
      <div>
        {steps.length !== 0 && (
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
                    onChange={() => onChangeStatus(selectedProjet.projetId)}
                    checked={switchComponent}
                  />
                </StatusBar>
              </div>
            </EtapeTitle>

            <DescriptionEtape>
              <div>
                <div>{steps.etapeValues.description}</div>
                <Button onClick={() => validerEtape(steps.etapeId)}>
                  Valider Étape
                </Button>
              </div>
            </DescriptionEtape>
          </>
        )}
      </div>
    </div>
  )
}

export default EtapesCard

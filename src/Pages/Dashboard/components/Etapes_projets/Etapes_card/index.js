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

  const validerEtape = id => {
    const list = []
    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}/${id}`)
      .update({
        status: 'valide'
      })

    firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}`)
      .once('child_added', async data => {
        const result = await data
        list.push(result)
        console.log('(//////////////)))))))))', list)
      })
  }
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
    const list = []

    const listener = firebase
      .database()
      .ref(`projetEtapes/${selectedProjet.projetId}`)
      .on('child_added', async data => {
        console.log('DDDAAATTTAA', data.val())
        if (data) {
          const result = await data
          list.push(result)

          setSteps(list)
        }
        firebase
          .database()
          .ref(`projetEtapes/${selectedProjet.projetId}`)
          .off('child_added', listener)
      })

    steps.map(async etape => {
      if ((await etape.val().status) === 'active') {
        setSwitchComponent(true)
      }
    })
    return () => {
      firebase
        .database()
        .ref(`projetEtapes/${selectedProjet.projetId}`)
        .off('child_added', listener)
    }
  }, [projetId, selectedProjet.projetId])

  return (
    <div style={{ color: '#fff' }}>
      <div>
        <>
          <EtapeTitle>
            <Title>Étape</Title>

            {steps.map(
              item =>
                item.val().status !== 'valide' && (
                  <div key={item.key}>
                    <StatusBar style={{ marginRight: '7px' }}>
                      <span style={{ marginRight: '7px' }}>
                        {switchComponent ? 'Active' : 'En arret'}
                      </span>

                      <Switch
                        height={25}
                        onColor="#00e676"
                        onChange={() => onChangeStatus(item.key)}
                        checked={switchComponent}
                      />
                    </StatusBar>
                  </div>
                )
            )}
          </EtapeTitle>

          <DescriptionEtape>
            {steps.map(
              item =>
                item.val().status === 'active' && (
                  <div key={item.key}>
                    <div>{item.val().description}</div>
                    <Button onClick={() => validerEtape(item.key)}>
                      Valider Étape
                    </Button>
                  </div>
                )
            )}
          </DescriptionEtape>
        </>
      </div>
    </div>
  )
}

export default EtapesCard

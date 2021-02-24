import React, { useEffect, useState, useContext } from 'react'
import Switch from 'react-switch'
import { FirebaseContext } from '../../../../../services/Firebase/context'

import {
  EtapeTitle,
  Title,
  StatusBar,
  DescriptionEtape,
  Button
} from './styles'

const EtapesCard = ({ etapes, projet_id }) => {
  const firebase = useContext(FirebaseContext)

  const [switchComponent, setSwitchComponent] = useState(false)
  const [projetId, setProjetId] = useState('')

  const onChangeStatus = id => {
    firebase
      .database()
      .ref(`projetEtapes/${projet_id}/${id}`)
      .update({
        status: switchComponent ? 'stopped' : 'active'
      })
    setSwitchComponent(!switchComponent)
  }

  const validerEtape = id => {
    firebase.database().ref(`projetEtapes/${projet_id}/${id}`).update({
      status: 'valide'
    })
    setProjetId(projet_id)
  }

  useEffect(() => {
    setProjetId(projet_id)

    /*    const etapesFilter = etapes.filter(item => item.val().status === 'active')

    setSteps(etapesFilter) */

    etapes.map(async etape => {
      if ((await etape.val().status) === 'active') {
        setSwitchComponent(true)
      } else {
        setSwitchComponent(false)
      }
    })

    /*  setSteps([]) */
  }, [etapes, projetId, projet_id])

  /* console.log('STEPS', steps) */

  return (
    <div style={{ color: '#fff' }}>
      <div>
        <>
          <EtapeTitle>
            <Title>Étape</Title>

            {etapes.map(
              item =>
                item.val().status === 'active' && (
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
            {etapes.map(
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

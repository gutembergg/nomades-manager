import React, { useEffect, useState, useContext } from 'react'
import Switch from 'react-switch'
import { FirebaseContext } from '../../../../../services/Firebase/context'
import EmailNotifications from '../Email_notifications'

import { EtapeTitle, Title, StatusBar } from './styles'

const EtapesCard = ({ etapes, projet_id }) => {
  const firebase = useContext(FirebaseContext)

  const [switchComponent, setSwitchComponent] = useState(false)

  const onChangeStatus = id => {
    firebase
      .database()
      .ref(`projetEtapes/${projet_id}/${id}`)
      .update({
        status: switchComponent ? 'stopped' : 'active'
      })
    setSwitchComponent(!switchComponent)
  }

  useEffect(() => {
    etapes.map(async etape => {
      if (etape.val().status === 'active') {
        setSwitchComponent(true)
      } else {
        setSwitchComponent(false)
      }
    })
  }, [etapes])

  return (
    <div style={{ color: '#fff' }}>
      <div>
        <EtapeTitle>
          <Title>Étape 1</Title>

          {etapes.map(item => (
            <StatusBar style={{ marginRight: '7px' }} key={item.key}>
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
          ))}
        </EtapeTitle>

        <ul>
          {etapes.map(item => (
            <li key={item.key}>{item.val().description}</li>
          ))}
        </ul>
      </div>
      <EmailNotifications etapes={etapes} />
    </div>
  )
}

export default EtapesCard

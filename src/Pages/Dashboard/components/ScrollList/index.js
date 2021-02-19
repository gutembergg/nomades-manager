import React from 'react'

import { Container } from './styles'
import './stylesCss.css'

const ScrollList = ({ listClient, selectClient }) => {
  return (
    <div>
      <h2 style={{ color: '#fff' }}>Mes Clients</h2>
      <Container id="clientList">
        <ul>
          {listClient &&
            listClient.map((client, index) => (
              <li
                className="client_list"
                id={client.key}
                style={{ color: '#fff' }}
                key={index}
                onClick={() => selectClient(client.key)}
              >
                {client.val().name}
              </li>
            ))}
        </ul>
      </Container>
    </div>
  )
}

export default ScrollList

import React from 'react'

import { Container } from './styles'

const ScrollList = ({ listClient, selectClient }) => {
  return (
    <div>
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

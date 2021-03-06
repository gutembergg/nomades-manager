import React from 'react'

import { Container, CodeText } from './styles'
import './stylesCss.css'

const ScrollList = ({ list, selectedDetail, title, info, clientCode }) => {
  return (
    <div>
      <h2 style={{ color: '#fff' }}>
        {title} {info}
      </h2>

      {clientCode && (
        <CodeText style={{ color: '#fff' }}>code: {clientCode}</CodeText>
      )}

      <Container id="clientList">
        <ul>
          {list &&
            list.map(item => (
              <li
                className="client_list"
                id={item.key}
                style={{ color: '#fff' }}
                key={item.key}
                onClick={() => selectedDetail(item.key)}
              >
                {item.val().name}
              </li>
            ))}
        </ul>
      </Container>
    </div>
  )
}

export default ScrollList

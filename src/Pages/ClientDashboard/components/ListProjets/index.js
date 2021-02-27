import React from 'react'

import { Container } from './styles'

const ListProjets = ({ listProjets, selectProjetFC }) => {
  console.log('===)))))))))))', listProjets)
  return (
    <>
      <Container>
        <ul>
          {listProjets.map(projet => (
            <li
              className="projet_list"
              key={projet.key}
              onClick={() => selectProjetFC(projet.key)}
            >
              {projet.val().name}
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export default ListProjets

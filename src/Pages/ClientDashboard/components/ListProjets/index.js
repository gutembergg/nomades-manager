import React from 'react'

import { Container } from './styles'

const ListProjets = ({ listProjets, selectProjet }) => {
  console.log('===)))))))))))', listProjets)
  return (
    <>
      <Container>
        <ul>
          {listProjets.map(projet => (
            <li
              className="projet_list"
              key={projet.key}
              onClick={() => selectProjet(projet.key)}
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

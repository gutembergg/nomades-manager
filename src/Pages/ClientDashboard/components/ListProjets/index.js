import React from 'react'

import { Container } from './styles'

const ListProjets = ({ projets, selectProjetFC }) => {
  return (
    <>
      <Container>
        <ul>
          {projets.map(projet => (
            <li
              className="projet_list"
              key={projet.projetKey}
              onClick={() => selectProjetFC(projet.projetKey)}
            >
              {projet.projetValues.name}
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export default ListProjets

import React, { useCallback, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { BsGearFill } from 'react-icons/bs'
import Etapes from '../Etapes_projets'

import { Container, InfoContent, InfoBlock, FormUpdate } from './styles'

const Projets = ({ selectedProjet }) => {
  const [enableInput, setEnableInput] = useState(false)

  const activeInput = useCallback(() => {
    setEnableInput(!enableInput)
  }, [enableInput])

  return (
    <Container>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <InfoBlock>
              {enableInput ? (
                <FormUpdate>
                  <input
                    type="text"
                    className="input_style"
                    data-name="name"
                    placeholder="nom"
                  />
                  <textarea
                    type="text"
                    className="input_style"
                    data-name="description"
                    placeholder="description"
                    rows="3"
                    cols="21"
                  ></textarea>
                  <input
                    type="text"
                    className="input_style"
                    data-name="link"
                    placeholder="lien du projet"
                  />
                  <button type="submit" className="btn_addClient">
                    Valider
                  </button>
                </FormUpdate>
              ) : (
                <InfoContent>
                  <p>{selectedProjet.projetValues?.name}</p>
                  <p>{selectedProjet.projetValues?.description}</p>
                  <p></p>
                  <button className="btn_update">Lien du projet</button>
                </InfoContent>
              )}

              <BsGearFill onClick={activeInput} />
            </InfoBlock>
          </MDBCol>
          <MDBCol style={{ background: '#000' }}>
            <Etapes selectedProjet={selectedProjet} />
          </MDBCol>
          <MDBCol>Firebase Storage</MDBCol>
        </MDBRow>
      </MDBContainer>
    </Container>
  )
}

export default Projets

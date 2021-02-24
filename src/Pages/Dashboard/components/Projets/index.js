import React, { useCallback, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { BsGearFill } from 'react-icons/bs'
import Etapes from '../Etapes_projets'
import UploadFiles from '../../../../Components/UploadFiles'
import Decisions from '../Decisions'

import {
  Container,
  InfoContent,
  InfoBlock,
  FormUpdate,
  TitleProjet
} from './styles'

const Projets = ({ selectedProjet }) => {
  const [enableInput, setEnableInput] = useState(false)

  const activeInput = useCallback(() => {
    setEnableInput(!enableInput)
  }, [enableInput])

  return (
    <Container>
      <MDBContainer>
        <TitleProjet>Projets</TitleProjet>
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
          <MDBCol>
            <Etapes selectedProjet={selectedProjet} />
          </MDBCol>
          <MDBCol>
            <UploadFiles projetId={selectedProjet.projetId} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer>
        <MDBRow className="history_block">
          <MDBCol size="4">
            <Decisions selectedProjet={selectedProjet} />
          </MDBCol>
          <MDBCol size="4">ZOOM</MDBCol>
        </MDBRow>
      </MDBContainer>
    </Container>
  )
}

export default Projets

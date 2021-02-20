import React, { useCallback, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { BsGearFill } from 'react-icons/bs'

import { Container, InfoContent, InfoBlock } from './styles'

const Projets = ({ selectedProjet }) => {
  const [enableInput, setEnableInput] = useState(true)

  const activeInput = useCallback(() => {
    setEnableInput(!enableInput)
  }, [enableInput])

  return (
    <Container>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <InfoBlock>
              <InfoContent>
                <input
                  type="text"
                  value={selectedProjet && selectedProjet.projetValues?.name}
                  placeholder="name"
                  disabled={enableInput}
                />
                {/* <input
                  type="text"
                  value={
                    selectedProjet && selectedProjet.projetValues?.description
                  }
                  placeholder="description"
                  disabled={enableInput}
                /> */}
                <textarea
                  value={
                    selectedProjet && selectedProjet.projetValues?.description
                  }
                  placeholder="description"
                  disabled={enableInput}
                  rows="3"
                  cols="35"
                ></textarea>
                <input
                  type="text"
                  value={selectedProjet && selectedProjet.projetValues?.link}
                  placeholder="lien"
                  disabled={enableInput}
                />
                {!enableInput && <button>Valider</button>}
              </InfoContent>
              <BsGearFill onClick={activeInput} />
            </InfoBlock>
          </MDBCol>
          <MDBCol>One of three columns</MDBCol>
          <MDBCol>One of three columns</MDBCol>
          <MDBCol>One of three columns</MDBCol>
        </MDBRow>
      </MDBContainer>
    </Container>
  )
}

export default Projets

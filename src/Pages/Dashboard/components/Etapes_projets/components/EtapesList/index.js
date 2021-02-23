import React, { useState } from 'react'
import { MDBCollapse } from 'mdbreact'
import { BsCardList } from 'react-icons/bs'

import { StepList, StepListButton } from './styles'

const EtapesList = ({ list }) => {
  const [toggle, setToggle] = useState(false)

  const listToggle = () => {
    setToggle(!toggle)
  }
  return (
    <>
      <StepListButton onClick={listToggle}>
        <BsCardList className="icon_plus" /> List étapes
      </StepListButton>
      <MDBCollapse isOpen={toggle}>
        <StepList>
          <ul>
            {list.map(etape => (
              <li className="etapes_list" key={etape.key}>
                {etape.val().description}
              </li>
            ))}
          </ul>
        </StepList>
      </MDBCollapse>
    </>
  )
}

export default EtapesList

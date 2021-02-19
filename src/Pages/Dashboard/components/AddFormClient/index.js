import React from 'react'

import { AddClientForm, InputBlock } from './styles'

const AddFormClient = ({ value, ...rest }) => {
  return (
    <div>
      {' '}
      <AddClientForm {...rest}>
        <InputBlock>
          <input
            {...rest}
            className="input_style"
            data-name="name"
            type="text"
            placeholder="Nom"
          />
          <input
            {...rest}
            className="input_style"
            data-name="email"
            type="text"
            placeholder="Email"
          />
          <input
            {...rest}
            className="input_style"
            data-name="zoom"
            type="text"
            placeholder="Lien Zoom"
          />

          <button className="btn_addClient" type="submit">
            Valider
          </button>
        </InputBlock>
      </AddClientForm>
    </div>
  )
}

export default AddFormClient

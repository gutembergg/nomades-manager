import React from 'react'

import { AddClientForm } from './styles'

const AddFormClient = ({ value, ...rest }) => {
  return (
    <div>
      {' '}
      <AddClientForm {...rest}>
        <input {...rest} data-name="name" type="text" />
        <input {...rest} data-name="email" type="text" />
        <input {...rest} data-name="zoom" type="text" />

        <button type="submit">Valider</button>
      </AddClientForm>
    </div>
  )
}

export default AddFormClient

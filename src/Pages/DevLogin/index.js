import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import { FaEnvelope, FaLock } from 'react-icons/fa'

import { Container, FormWrapper, Form, FormActions } from './styles'
import Button from '../../Components/Button'

const DevLogin = () => {
  const [model, setModel] = useState({
    email: '',
    password: ''
  })

  const updateModel = useCallback(
    e => {
      setModel({
        ...model,
        [e.target.name]: e.target.value
      })
    },
    [model]
  )

  return (
    <Container>
      <FormWrapper>
        <Form>
          <h1>Login Dev</h1>
          <Input onChange={updateModel} name="email" icon={FaEnvelope} />
          <Input
            onChange={updateModel}
            name="password"
            icon={FaLock}
            isPassword
          />
          <Button type="submit">Valider</Button>
          <FormActions>
            <Link to="/signup/dev">Créez votre compte</Link>
            <Link to="/">Returner</Link>
          </FormActions>
        </Form>
      </FormWrapper>
      <img src={Logo} alt="logo" />
    </Container>
  )
}

export default DevLogin

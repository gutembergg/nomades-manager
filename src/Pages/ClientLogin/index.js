import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { FaCode } from 'react-icons/fa'

import { Container, Content, Form, FormActions } from './styles'

const ClientLogin = () => {
  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <Content>
        <Form>
          <h1>Login comme client</h1>
          <Input icon={FaCode} placeholder="Code" />

          <Button>Entrer</Button>
          <FormActions>
            <Link to="/">Returner</Link>
          </FormActions>
        </Form>
      </Content>
    </Container>
  )
}

export default ClientLogin

import React from 'react'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import { FaEnvelope, FaLock } from 'react-icons/fa'

import { Container, FormWrapper, Form } from './styles'

const DevLogin = () => {
  return (
    <Container>
      <FormWrapper>
        <Form>
          <h1>Login Dev</h1>
          <Input icon={FaEnvelope} />
          <Input icon={FaLock} isPassword />
        </Form>
      </FormWrapper>
      <img src={Logo} alt="logo" />
    </Container>
  )
}

export default DevLogin

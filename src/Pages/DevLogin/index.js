import React, { useCallback, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import FirebaseContext from '../../services/Firebase/context'

import { Container, FormWrapper, Form, FormActions } from './styles'
import Button from '../../Components/Button'

const DevLogin = () => {
  const firebaseContext = useContext(FirebaseContext)
  const [model, setModel] = useState({
    email: '',
    password: ''
  })

  console.log('firebaseContext', firebaseContext)

  const updateModel = useCallback(
    e => {
      setModel({
        ...model,
        [e.target.name]: e.target.value
      })
    },
    [model]
  )

  /*  const submitForm = useCallback(() => {}, []) */

  return (
    <Container>
      <FormWrapper>
        <Form>
          <h1>Login Dev</h1>
          <Input
            type="email"
            onChange={updateModel}
            name="email"
            icon={FaEnvelope}
          />
          <Input
            type="password"
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

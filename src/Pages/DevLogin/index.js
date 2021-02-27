import React, { useCallback, useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { FirebaseContext } from '../../services/Firebase/context'

import { Container, FormWrapper, Form, FormActions } from './styles'
import Button from '../../Components/Button'

const DevLogin = () => {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)

  const [model, setModel] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    firebase
      .database()
      .ref('projetEtapes')
      .once('value', snapshot => {
        snapshot.forEach(snapChild => {
          console.log(snapChild)
        })
      })
  }, [])

  const updateModel = useCallback(
    e => {
      setModel({
        ...model,
        [e.target.name]: e.target.value
      })
    },
    [model]
  )

  const submitForm = useCallback(
    e => {
      e.preventDefault()
      firebase
        .auth()
        .signInWithEmailAndPassword(model.email, model.password)
        .then(userCredential => {
          const user = userCredential.user
          console.log('userss', user)

          const userEmail = firebase.auth().currentUser.email

          console.log('User-mail', userEmail)

          history.push('/dashboard/dev')
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('Erros', errorMessage, errorCode)
        })
    },
    [model]
  )
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={submitForm}>
          <h1>Login Dev</h1>
          <Input
            type="email"
            name="email"
            value={model.email}
            onChange={updateModel}
            icon={FaEnvelope}
          />
          <Input
            type="password"
            name="password"
            value={model.password}
            onChange={updateModel}
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

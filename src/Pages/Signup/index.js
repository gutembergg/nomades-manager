import React, { useCallback, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { FirebaseContext } from '../../services/Firebase/context'

import { Container, Content, Form } from './styles'

const Signup = () => {
  const history = useHistory()

  const firebase = useContext(FirebaseContext)

  const [model, setModel] = useState({
    name: '',
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

  const signupUser = useCallback(
    e => {
      e.preventDefault()
      firebase
        .auth()
        .createUserWithEmailAndPassword(model.email, model.password)
        .then(authUser => {
          if (authUser) {
            firebase.database().ref(`users/${authUser.user.uid}`).set({
              name: model.name,
              email: model.email
            })
          }
        })
        .catch(err => console.log(err))

      history.push('/dashboard/dev')
    },
    [model]
  )

  return (
    <Container>
      <Content>
        <Form onSubmit={signupUser}>
          <h1>Créer compte </h1>
          <Input
            type="text"
            name="name"
            value={model.name}
            onChange={updateModel}
            icon={FaUser}
          />
          <Input
            type="email"
            name="email"
            value={model.email}
            icon={FaEnvelope}
            onChange={updateModel}
          />
          <Input
            type="password"
            name="password"
            value={model.password}
            icon={FaLock}
            isPassword
            onChange={updateModel}
          />
          <Button type="submit">Valider</Button>
        </Form>
      </Content>
      <img src={Logo} alt="logo" />
    </Container>
  )
}

export default Signup

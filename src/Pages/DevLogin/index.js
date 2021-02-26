import React, { useCallback, useState, useContext } from 'react'
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

  console.log('========///////////////')
  const listProjetId = []

  firebase
    .database()
    .ref('projetList')
    .on('child_added', snapshot => {
      snapshot.forEach(async childSnapshot => {
        const parentKey = await childSnapshot.ref.parent.key
        const childKey = childSnapshot.val()

        console.log('childKey', childKey)
        /*  const toDay = new Date()
        const toDayCompare = toDay.toLocaleDateString()

        const echeance = new Date(etapeEcheance)
        const echeanceCompare = echeance.toLocaleDateString()

        if (toDayCompare === echeanceCompare) {
          console.log('childKey', childKey)
        } else {
          console.log('Pas gangne')
        } */

        listProjetId.push(parentKey)

        firebase
          .database()
          .ref('clientProjets')
          .on('value', snap => {
            snap.forEach(snapChild => {
              /*  const parentKey2 = snapChild.ref.parent.key
                const childKey = snapChild.val()
                console.log('PARENT2-----------------------', parentKey2)
                console.log('CHILD2----------------------', childKey) */
              firebase.database().ref('projetEtapes').off('value')
            })
          })
        firebase.database().ref('projetEtapes').off('child_added')
      })
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

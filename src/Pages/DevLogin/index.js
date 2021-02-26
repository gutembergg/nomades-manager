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
  const [projetsIDList, setProjetsIDList] = useState([])

  useEffect(() => {
    getAllSteps()
  }, [])

  const getAllSteps = () => {
    console.log('========///////////////')
    const listProjetId = []
    const listEtapesDepasse = []

    firebase
      .database()
      .ref('projetEtapes')
      .on('child_added', snapshot => {
        snapshot.forEach(async childSnapshot => {
          const parentKey = await childSnapshot.ref.parent.key
          const childKey = childSnapshot.key
          const etapeEcheance = childSnapshot.val().echeance

          const toDay = new Date()
          const toDayCompare = toDay.toLocaleDateString()

          const echeance = new Date(etapeEcheance)
          const echeanceCompare = echeance.toLocaleDateString()

          if (toDayCompare === echeanceCompare) {
            listEtapesDepasse.push(childKey)
          } else {
            console.log('Pas gangne')
          }

          listProjetId.push(parentKey)

          setProjetsIDList(listProjetId)
          firebase
            .database()
            .ref('clientProjets')
            .on('value', snap => {
              snap.forEach(snapChild => {
                /*  const parentKey2 = snapChild.ref.parent.key
                const childKey = snapChild.val()
                console.log('PARENT2-----------------------', parentKey2)
                console.log('CHILD2----------------------', childKey) */
              })
            })

          console.log('parentKey', parentKey)
          console.log('childKey======', childKey)
          console.log('etapeEcheance', etapeEcheance)
          firebase.database().ref('projetEtapes').off('child_added')
        })
      })
  }

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
          getAllSteps()

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

  console.log('projetsIDList', projetsIDList)

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

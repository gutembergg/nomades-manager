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
  /*
  useEffect(() => {
    firebase
      .database()
      .ref('projetEtapes')
      .once('value', snapshot => {
        snapshot.forEach(snapChild => {
          console.log('=====>', snapChild.key)

          firebase
            .database()
            .ref(`projetEtapes/${snapChild.key}`)
            .once('value', data => {
              const result = Object.keys(data.toJSON())
              console.log('RESULT', result)
              result.forEach(item => {
                firebase
                  .database()
                  .ref(`projetEtapes/${snapChild.key}/${item}`)
                  .once('value', res => {
                    console.log('RES', res.key)
                    const projetKey = res.ref.parent.key
                    const echeanceDate = res.val().echeance
                    const toDay = new Date()
                    const toDayCompare = toDay.toLocaleDateString()

                    const echeance = new Date(echeanceDate)
                    const echeanceCompare = echeance.toLocaleDateString()

                    // get client ID///////////////////////////////
                    if (toDayCompare === echeanceCompare) {
                      console.log('GAGNE', projetKey)
                      firebase
                        .database()
                        .ref(`projetList/${projetKey}`)
                        .once('value', snap => {
                          console.log('SNAP==>>', snap.val().clientId)
                          const clientResponseId = snap.val().clientId

                          firebase
                            .database()
                            .ref('userClients')
                            .once('value', client => {
                              console.log('CLIENT', client.val())
                              const res2 = client.val()
                              const response = Object.keys(res2)
                              response.forEach(userId => {
                                firebase
                                  .database()
                                  .ref(`userClients/${userId}`)
                                  .once('value', userClient => {
                                    console.log('userClient', userClient.val())
                                    const userClientValues = userClient.val()
                                    const idClient = Object.keys(
                                      userClientValues
                                    )
                                    console.log('idClient', idClient)
                                    idClient.forEach(id => {
                                      if (clientResponseId === id) {
                                        console.log(
                                          'EEEEEEEEENNNNNNNnFFFF',
                                          userClient.key
                                        )

                                        firebase
                                          .database()
                                          .ref(`users/${userClient.key}`)
                                          .once('value', val => {
                                            console.log(
                                              '========(((((((())))))))))=========='
                                            )
                                            console.log(
                                              'VAL========',
                                              val.val()
                                            )
                                          })
                                      }
                                    })
                                  })
                              })
                            })
                        })
                    } else {
                      console.log('Pas gangne')
                    }
                  })
              })
            })
        })
      })
  }, [])
 */
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

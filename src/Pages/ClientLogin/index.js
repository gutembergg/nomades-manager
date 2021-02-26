import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FirebaseContext } from '../../services/Firebase/context'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { FaCode } from 'react-icons/fa'

import { Container, Content, Form, FormActions } from './styles'

const ClientLogin = () => {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)

  const [clientCode, setClientCode] = useState('')

  const authClient = () => {
    const listClients = []
    firebase
      .database()
      .ref('userClients')
      .once('value', snapParent => {
        snapParent.forEach(snapChild => {
          const child = snapChild.key
          /* listClients.push(child) */
          console.log('child', child)

          firebase
            .database()
            .ref(`userClients/${child}`)
            .once('value', snap => {
              console.log('snap===>>', Object.keys(snap.toJSON()))
              const result = Object.keys(snap.toJSON())
              result.forEach(item => {
                firebase
                  .database()
                  .ref(`userClients/${child}/${item}`)
                  .once('value', data => {
                    console.log('data', data.val().code)

                    if (data.val().code === clientCode) {
                      console.log('AAAAAHHHHH', data.ref.parent.key)
                      console.log('mmmmaaassssaa', data.key)
                      const userData = {
                        userId: data.ref.parent.key,
                        clientId: data.key
                      }
                      history.push('/dashboard/client', { params: userData })
                    }
                  })
              })
            })

          console.log('childClient', listClients)
        })
      })
  }

  const handleOnChange = e => {
    setClientCode(e.target.value)
  }

  console.log('handleOnChange', clientCode)

  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <Content>
        <Form>
          <h1>Login comme client</h1>
          <Input
            value={clientCode}
            onChange={handleOnChange}
            icon={FaCode}
            placeholder="Code"
          />

          <Button onClick={authClient}>Entrer</Button>
          <FormActions>
            <Link to="/">Returner</Link>
          </FormActions>
        </Form>
      </Content>
    </Container>
  )
}

export default ClientLogin

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { FirebaseContext } from '../../services/Firebase/context'
import Logo from '../../assets/logo.png'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { FaCode } from 'react-icons/fa'

import { Container, Content, Form, FormActions } from './styles'

const ClientLogin = props => {
  const firebase = useContext(FirebaseContext)

  const [clientCode, setClientCode] = useState('')

  const authClient = () => {
    firebase
      .database()
      .ref('userClients')
      .once('value', snapParent => {
        snapParent.forEach(snapChild => {
          const child = snapChild.key

          firebase
            .database()
            .ref(`userClients/${child}`)
            .once('value', snap => {
              const result = Object.keys(snap.toJSON())
              result.forEach(item => {
                firebase
                  .database()
                  .ref(`userClients/${child}/${item}`)
                  .once('value', data => {
                    if (data.val().code === clientCode) {
                      const userData = {
                        userId: data.ref.parent.key,
                        clientId: data.key
                      }
                      props.history.push({
                        pathname: '/dashboard/client',
                        state: {
                          data: userData
                        }
                      })
                    }
                  })
              })
            })
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

import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../../../../../services/Firebase/context'
import emailJs from 'emailjs-com'

const EmailNotifications = ({ etapes }) => {
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    /// Get users projects echeances///////////////////////////////////////////
    const listener = firebase
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
                          console.log('SNAP==>>===>>>>', snap.val().name)
                          const projectName = snap.val().name
                          console.log('projectName', projectName)
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
                                        firebase
                                          .database()
                                          .ref(`users/${userClient.key}`)
                                          .once('value', val => {
                                            sendEmail(
                                              val.val().email,
                                              projectName
                                            )
                                            console.log('ok')
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

    return () => listener

    /// ///////////////////////////////////////////////////////////////////////
  }, [])

  const sendEmail = (email, projectName) => {
    const emailParams = {
      from_name: 'ProjetManager',
      to_name: email,
      message: `vous êtes arrivé a la écheance pour le projet: ${projectName}`,
      reply_to: email
    }
    emailJs
      .send(
        'service_xtxdh99',
        'template_pphabso',
        emailParams,
        'user_m6Vr8tTl3nxIGbi1Dkr9t'
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
        }
      )
  }

  return <></>
}

export default EmailNotifications

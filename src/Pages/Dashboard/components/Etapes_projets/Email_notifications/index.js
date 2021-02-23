import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../../../../../services/Firebase/context'
import emailJs from 'emailjs-com'

import { getEcheance } from '../../../../../Utils/getEcheanceEtapes'

const EmailNotifications = ({ etapes }) => {
  const firebase = useContext(FirebaseContext)
  const userEmail = firebase.auth().currentUser.email

  const emailParams = {
    from_name: 'ProjetManager',
    to_name: userEmail,
    message: 'Echeances !!!!!!!!!!!!',
    reply_to: userEmail
  }
  /*
  const getEtapesEcheance = async () => {
    const firebaseRef = await firebase.database().ref('projetEtapes').get()

    console.log('firebaseRef', firebaseRef)
     return firebaseRef.child.map(doc => console.log('getDATA', doc))
  }

  getEtapesEcheance() */

  /* firebaseRef.on('value', snapshot => {
    const data = snapshot.val()
    console.log('DATA', data)
  })
  console.log('firebaseRef', firebaseRef)
 */
  useEffect(() => {
    getEcheance(etapes[0].val().echeance, sendEmail)
  }, [])

  const sendEmail = () => {
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

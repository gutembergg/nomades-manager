import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../../../services/Firebase/context'

const ScrollList = ({ userId }) => {
  const firebase = useContext(FirebaseContext)

  const [listClients, setListClients] = useState([])

  useEffect(() => {
    const list = [...listClients]

    firebase
      .database()
      .ref(`userClients/${userId}`)
      .on('child_added', data => {
        console.log('userscl===>', data.key)
        if (data) {
          const result = data.val()

          list.push(result)
        }
      })
    setListClients(list)
    firebase.database().ref('userClients').off('child_added')
  }, [userId])

  console.log('listClients', listClients)

  return (
    <div>
      <div>
        <ul>
          {listClients.map((client, index) => (
            <li key={index}>{client.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ScrollList

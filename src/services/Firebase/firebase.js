/* import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyAO5cS5vP3ihmaBzX5uwoAhi1ZzR3Ck06I',
  authDomain: 'manager-f1ac5.firebaseapp.com',
  databaseURL: 'https://manager-f1ac5-default-rtdb.firebaseio.com',
  projectId: 'manager-f1ac5',
  storageBucket: 'manager-f1ac5.appspot.com',
  messagingSenderId: '258533374053',
  appId: '1:258533374053:web:0e4bccdfa0a96a488d2e8c'
}

firebase.initializeApp(config)

firebase
  .auth()
  .createUserWithEmailAndPassword('gmascarenhas3001@gmail.com', '123456')
  .then(authUser => console.log('authUser', authUser))

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.database = firebase.database()
  }

  signup(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password).then(authUser => {
      return authUser
    })
  }
}

export default Firebase
 */

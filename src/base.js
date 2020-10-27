import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBZatW9CE54u2rV0zbf9naZUcH8Ghj9h1U",
  authDomain: "receipe-app-71bb0.firebaseapp.com",
  databaseURL: "https://receipe-app-71bb0.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base

const firebase = require("firebase")
require("firebase/firestore")
require("firebase/database")
require("firebase/auth")

firebase.initializeApp({
  apiKey: "AIzaSyCESTdwMle00N-eaG_e02D7MWns9GNMAa8",
  authDomain: "bringsmeback-ce1f0.firebaseapp.com",
  databaseURL: "https://bringsmeback-ce1f0.firebaseio.com",
  projectId: "bringsmeback-ce1f0",
  storageBucket: "bringsmeback-ce1f0.appspot.com",
  messagingSenderId: "765270648179"
})
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export const fdb = firebase.database()

export default db

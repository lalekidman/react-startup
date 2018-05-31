import * as firebase from 'firebase'
export const authenticateUser = ({email, password}) => {
  const auth = firebase.auth()
  return auth.signInWithEmailAndPassword(email, password).then(snap => {
    return snap
  })
}
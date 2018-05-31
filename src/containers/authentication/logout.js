import React from 'react'
import * as firebase from 'firebase'
class Logout extends React.Component {
  constructor (props) {
    super(props)
    this.auth = firebase.auth()
    this.auth.signOut()
  }
  render () {
    return null
  }
}
export default Logout
import React from 'react'
import PrivateRoute from '../utils/PrivateRouter'
import {Switch, withRouter} from 'react-router-dom'
import Toast from '../utils/Toast'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import AuthenticationForm from './authentication'
import MainForm from './main.js'
import {authenticatedUser, authenticateUserFailed} from '../redux/authentication/actions'
import * as firebase from 'firebase'
import './css/style.css'
import './css/buttons.css'
import Notification from '../utils/notification'
import {showNotificationMessage} from '../redux/notification-top/actions'
class Wrapper extends React.Component {
  constructor (props) {
    super(props)
    this.isProceedStatuses = [
      'FAILED',
      'FETCHED'
    ]
  }
  handleAuthenticationResponse (props) {
    const {authentication} = props
    if (this.props.authentication.status !== authentication.status) {
      if (authentication.status === 'FETCHED') {
        console.log('auth: ', authentication)
      } else if (authentication.status === 'FETCHING') {
        this.props.showNotificationMessage('Authenticating...', 1)
      } else if (authentication.status === 'FAILED') {
        this.props.showNotificationMessage(authentication.error, 4)
      }
    }
  }
  componentDidMount () {
    const auth = firebase.auth()
    const db = firebase.firestore()
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const {email} = firebaseUser
        if (firebaseUser.emailVerified) {
          db.collection('entity')
            .where('email', '==', email)
            .orderBy('createdAt', 'desc')
            .limit(1)
            .get()
              .then(snap => {
                if (snap) {
                  if (snap.docs.length >= 1) {
                    const currentUser = snap.docs[0].data()
                    if (currentUser.status === 1) {
                      if (currentUser.verified) {
                        this.props.authenticatedUser(currentUser)
                      }
                    } else if (currentUser.status === 3) {
                      throw new Error('You are currently suspended to kyoo.')
                    }
                  } else {
                    throw new Error('User not found.')
                  }
                } else {
                  throw new Error('User not found.')
                }
          }).catch(err => {
            this.props.authenticateUserFailed(err.message)
            return auth.signOut()
          })
        } else {
          auth.signOut()
          throw new Error('User not verified')
        }
      } else {
        this.props.authenticateUserFailed('')
      }
    })
  }
  componentWillReceiveProps (newProps) {
    this.handleAuthenticationResponse(newProps)
  }
  isProceed (props) {
    return (this.isProceedStatuses.indexOf(props.authentication.status) >= 0)
  }
  shouldComponentUpdate (props) {
    return this.isProceed(props)
  }
  render () {
    const isAuthenticated = (this.props.authentication.status === 'FETCHED')
    return this.isProceed(this.props) ? (
      <div>
        <Switch>
          <PrivateRoute path='/authentication' exact component={AuthenticationForm} needAuthed={false} isAuthed={isAuthenticated} redirectTo={'/'} />
          <PrivateRoute path='/' component={MainForm} needAuthed={true} isAuthed={isAuthenticated} redirectTo={'/authentication'} />
        </Switch>
        <Notification />
        {/* <Toast /> */}
      </div>
    ) : null
  }
}
const mapStateToProps = ({authentication}) => ({
  authentication
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authenticatedUser,
    showNotificationMessage,
    authenticateUserFailed
  }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))

import React, {Component} from 'react'
import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'
import './style.css'
class Notifications extends Component {
  constructor () {
    super()
    this.state = {
      message: '',
      open: false
    }
    this.fadeOutTimer = 0
    this.alertType = [
      '',
      'alert-primary',
      'alert-secondary',
      'alert-success',
      'alert-danger',
      'alert-warning',
      'alert-info',
      'alert-light',
      'alert-dark'
    ]
  }
  componentDidMount () {
    this.handleClose(1)
  }
  handleOpen = (msg) => {
    this.setState({
      message: msg
    })
    window.clearTimeout(this.fadeOutTimer)
    window.$('#notification-top').fadeIn(100)
    this.fadeOutTimer = window.setTimeout(() => {
      this.handleClose()
    }, 3000)
  }
  handleClose = (fadeTime) => {
    window.$('#notification-top').fadeOut(fadeTime || 500)
    window.clearTimeout(this.fadeOutTimer)
  }
  componentWillReceiveProps ({notificationMessage}) {
    // if (this.props.notificationMessage.message !== notificationMessage.message) {
      if (notificationMessage.message) {
        this.handleOpen(notificationMessage.message)
      }
    // }
  }
  render () {
    const {message} = this.state
    return (
      <div className={`alert ${this.alertType[this.props.notificationMessage.mode]} alert-dismissible fade show`} id = 'notification-top' role="alert">
        {message}
        <button type="button" className="close" onClick={this.handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({notificationMessage}) => {
  return {
    notificationMessage
  }
}
export default connect(mapStateToProps)(Notifications)

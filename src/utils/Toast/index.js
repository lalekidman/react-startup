import React, {Component} from 'react'
import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'
class Toast extends Component {
  constructor () {
    super()
    this.state = {
      message: '',
      open: false,
      autoHideDuration: 5000
    }
  }
  get handle () {
    return {
      open: (message) => {
        this.setState({
          open: true,
          message: message
        })
      },
      close: () => {
        this.setState({
          open: false,
          message: ''
        })
      }
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.toast.message) {
      this.handle.open(newProps.toast.message)
    }
  }
  render () {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handle.close}
        />
      </div>
    )
  }
}

const mapStateToProps = ({toast}) => {
  return {
    toast
  }
}
export default connect(mapStateToProps)(Toast)

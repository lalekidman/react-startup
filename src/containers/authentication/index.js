import React from 'react'
import CForm from '../../utils/Form'
import * as firebase from 'firebase'
// import {showToastMessage} from '../../redux/toast/actions'
import {authenticateUser} from '../../redux/authentication/actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {DEFAULT_IMAGE_LOGO, LOCK_LOGO, IMAGE_LOGO} from '../../utils/constants'
import Checkbox from 'material-ui/Checkbox'
import '../css/authentication.css'
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.auth = firebase.auth()
    this.state = {
      formButton: {
        status: false,
        label: 'Login'
      },
      email: '',
      password: ''
    }
  }
  handleChange = (data) => {
    this.setState(data)
  }
  handleFormButton (status = false, label = 'Login') {
    this.setState({
      formButton: {
        status,
        label
      }
    })
  }
  handleAuthenticationResponse (props) {
    const {authentication} = props
    if (this.props.authentication.status !== authentication.status) {
      if (authentication.status === 'FETCHED') {
        console.log('auth: ', authentication)
      } else if (authentication.status === 'FETCHING') {
        this.handleFormButton(true, 'Authenticating...')
      } else if (authentication.status === 'FAILED') {
        console.log('HEHEXXX')
        this.handleFormButton()
      }
    }
  }
  handleSubmit = () => {
    const {email, password} = this.state
    this.props.authenticateUser({email, password})
  }
  componentWillReceiveProps (newP) {
    console.log('newP: ', newP)
    this.handleAuthenticationResponse(newP)
  }
  render () {
    const {formButton} = this.state
    return (
      <div className='kyoo-bg'>
        <div className = 'container'>
          <div className='login-container'>
              <div className='login-logo'>
                <img src={IMAGE_LOGO || DEFAULT_IMAGE_LOGO}/>
              </div>
            <div className='login-content'>
              <div className='row'>
                  <div className='col-12 inputs'>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><span className='fa fa-envelope'/></span>
                      </div>
                      <input type="text" onChange={(ev) => this.handleChange({email: ev.target.value})}className="form-control" placeholder="Email/Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                  </div>
                  <div className='col-12 inputs'>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><span className='fa fa-lock'/></span>
                      </div>
                      <input type="password" onChange={(ev) => this.handleChange({password: ev.target.value})}className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                    </div>
                  </div>
                  <div className='col-12 inputs'>
                    <div className='remember-me'>
                      <input type='checkbox' id = 'c1'/>
                      <label htmlFor="c1">Remember Me</label>
                    </div>
                  </div>
                  <div className='col-12 inputs'>
                    <button className='btn btn-primary' onClick={this.handleSubmit} disabled={formButton.status}>{formButton.label}</button>
                  </div>
                  <div className='col-12'>
                    <button className='forgot-password btn btn-link'>Forgot Password?</button>
                      {/* <a href = '#' className='forgot-password'>Forgot Password</a> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <CForm data={this.state.formData} handleSubmit={this.handleSubmit} formButton={this.state.formButton}/> */}
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({authentication}) => ({
  authentication
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
  // showToastMessage,
  authenticateUser
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(Login)
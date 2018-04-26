import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '../TextField'
import SelectField from '../SelectField'
import NumberField from '../NumberField'
import UsernameField from '../UsernameField'
import EmailField from '../EmailField'
import PasswordField from '../PasswordField'
import DatePicker from '../DatePicker'
import TimePicker from '../TimePicker'
import RaisedButton from 'material-ui/RaisedButton'
const FormItems = ({type, ...props}) => {
// const FormItems = ({type, name = '', min = 0, max = 0, fullWidth = true, isRequired = false, validation = true, floatingLabel = '', handleChange, handleKeyUp, modelValue, defaultValue, options = [], mode = '', minDate = {}, maxDate={}}) => {
  if (type === 'text') {
    return (
      <TextField
        {...props}
      />
    )
  } else if (type === 'username') {
    return (
      <UsernameField
        {...props}
      />
    )
  } else if (type === 'number') {
    return (
      <NumberField
        {...props}
      />
    )
  } else if (type === 'email') {
    return (
      <EmailField
      {...props}

      />
    )
  } else if (type === 'password') {
    return (
      <PasswordField
      {...props}
      />
    )
  } else if (type === 'select') {
    return (
      <SelectField
        {...props}
      />
    )
  } else if (type === 'datepicker') {
    return (
      <DatePicker
        {...props}
      />
    )
  } else if (type === 'timepicker') {
    return (
      <TimePicker
        {...props}
      />
    )
  }
  return null
}

class CustomForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      formButton: {
        status: (props.formButton) ? props.formButton.status : false,
        label: (props.formButton) ? props.formButton.label : 'SUBMIT'
      },
      formButtonShow: (this.props.formButtonShow !== undefined) ? this.props.formButtonShow : true,
      validationStatus: false
    }
    this.DEFAULT_COL_SIZE = 12
  }
  handleChange = (obj) => {
    this.setState({
      data: Object.assign(this.state.data, obj)
    })
    this.handleValidationStatus()
  }
  handleValidationStatus = () => {
    this.setState({
      validationStatus: this.handleFormValidation()
    })
  }
  handleSubmit = () => {
    if (this.props.handleSubmit) {
      this.props.handleSubmit(this.state.data)
    }
  }
  handleKeyUp = (code) => {
    if (code === 13) {
      if (!this.state.validationStatus) {
        this.handleSubmit()
      }
    }
  }
  handleFormValidation (status) {
    let {data} = this.state
    let dataKeys = Object.keys(data)
    let dataLen = dataKeys.length
    for (let x = 0; x < dataLen; x++) {
      if (data[dataKeys[x]] === undefined || data[dataKeys[x]] === null || data[dataKeys[x]] === '') {
        return true
      }
    }
    return (status !== undefined) ? status : this.state.formButton.status
  }
  handleFormButtonDisplay = () => {
    return {
      display: this.state.formButtonShow ? 'inline-block' : 'none'
    }
  }
  handleFormButton = (props) => {
    if (props.formButton) {
      if (this.props.formButton.status !== props.formButton.status) {
        this.setState({
          formButton: {
            label: props.formButton.label,
            status: props.formButton.status
          },
          validationStatus: this.handleFormValidation(props.formButton.status)
        })
      }
    }
  }
  componentDidUpdate () {
    if (this.props.handleChange) {
      this.props.handleChange(this.state.data)
    }
    if (this.props.handleValidation) {
      this.props.handleValidation(!this.state.validationStatus)
    }
  }
  componentWillReceiveProps (newProps) {
    this.handleFormButton(newProps)
  }
  // shouldComponentUpdate (newProps, newState) {
  //   if (this.props.formButton.status !== newProps.formButton.status) {
  //     return true
  //   }
  //   return false
  // }
  render () {
    const pullRight = this.props.pullButtonsRight ? 'justify-content-end' : ''
    return (
      <form>
        <div className='row'>
        {
          this.props.data.map((el, ind) => {
            return (
              <div className={`col-md-${el.colSize || this.DEFAULT_COL_SIZE}`} key={ind}>
                  <FormItems
                    {...el}
                    fullWidth={true}
                    handleChange={this.handleChange}
                    handleKeyUp={this.handleKeyUp}
              />
              </div>
            )
          })
        }
        </div>
        <div className={`row ${pullRight}`}>
          <div className='4'>
            {this.props.handleBackButton ? <RaisedButton
            style={{marginRight: 12}}
            label={'Back'}
            onClick={this.props.handleBackButton}
          /> : ''}
          <RaisedButton
            style={this.handleFormButtonDisplay()}
            disabled={this.state.validationStatus}
            label={this.state.formButton.label}
            onClick={this.handleSubmit}
          />
          </div>
        </div>
      </form>
    )
  }
}
CustomForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleValidation: PropTypes.func,
  handleBackButton: PropTypes.func,
  data: PropTypes.array.isRequired,
  formButtonShow: PropTypes.bool,
  pullButtonsRight: PropTypes.bool,
  formButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
  })
}
export default CustomForm

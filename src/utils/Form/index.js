import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '../TextField'
import SelectField from '../SelectField'
import UsernameField from '../UsernameField'
import EmailField from '../EmailField'
import PasswordField from '../PasswordField'
import RaisedButton from 'material-ui/RaisedButton'
const FormItems = ({type, name = '', min = 0, max = 0, fullWidth = true, isRequired = false, validation = true, floatingLabel = '', handleChange, handleKeyUp, modelValue, defaultValue, options = []}) => {
  if (type === 'text') {
    return (
      <TextField
        name={name}
        min={min}
        max={max}
        fullWidth={fullWidth}
        isRequired={isRequired}
        floatingLabel={floatingLabel}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        modelValue={modelValue}
        defaultValue={defaultValue}
        validation={validation}
      />
    )
  } else if (type === 'username') {
    return (
      <UsernameField
        name={name}
        min={min}
        max={max}
        fullWidth={fullWidth}
        isRequired={isRequired}
        floatingLabel={floatingLabel}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        modelValue={modelValue}
        defaultValue={defaultValue}
        validation={validation}
      />
    )
  } else if (type === 'email') {
    return (
      <EmailField
        name={name}
        min={min}
        max={max}
        fullWidth={fullWidth}
        isRequired={isRequired}
        floatingLabel={floatingLabel}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        modelValue={modelValue}
        defaultValue={defaultValue}
        validation={validation}
      />
    )
  } else if (type === 'password') {
    return (
      <PasswordField
        name={name}
        fullWidth={fullWidth}
        isRequired={isRequired}
        floatingLabel={floatingLabel}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        modelValue={modelValue}
        defaultValue={defaultValue}
        validation={validation}
      />
    )
  } else if (type === 'select') {
    return (
      <SelectField
        name={name}
        fullWidth={fullWidth}
        isRequired={isRequired}
        floatingLabel={floatingLabel}
        handleChange={handleChange}
        modelValue={modelValue}
        defaultValue={defaultValue}
        validation={validation}
        options={options}
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
    return (
      <form>
        {
          this.props.data.map((el, ind) => {
            return <FormItems
              key={ind}
              defaultValue={el.defaultValue}
              name={el.name}
              type={el.type}
              min={el.min}
              max={el.max}
              fullWidth={true}
              floatingLabel={el.floatingLabel}
              handleChange={this.handleChange}
              handleKeyUp={this.handleKeyUp}
              modelValue={el.modelValue}
              validation={el.validation}
              options={el.options}
            />
          })
        }
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
  formButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
  })
}
export default CustomForm

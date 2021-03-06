import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
class CPasswordField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      validation: (this.props.validation === undefined) ? true : this.props.validation,
      fullWidth: this.props.fullWidth || false,
      value: props.defaultValue || '',
      modelValue: this.props.modelValue || ''
    }
  }
  setChanges (props) {
    this.handle.change({
      target: {
        name: props.name,
        value: props.modelValue || ''
      }
    })
  }
  componentDidMount () {
    if (this.props.modelValue) {
      this.setChanges(this.props)
    } else {
      this.callback({
        valid: false,
        value: this.state.value,
        name: this.props.name
      })
    }
  }
  componentWillReceiveProps (newProps) {
    if (typeof newProps.modelValue !== 'undefined') {
      if (this.props.modelValue !== newProps.modelValue) {
        this.setChanges(newProps)
      }
    }
  }
  callback ({value = null, name, valid = false}) {
    let data = {}
    data[name] = value
    this.props.handleChange(data)
  }
  setError (err = '') {
    this.setState({
      error: err
    })
  }
  get handle () {
    return {
      change: (ev) => {
        let val = ev.target.value
        this.setState({
          modelValue: val
        })
        let spaces = /\s/g
        let bigChar = /[A-Z]{1}/g
        let smallChar = /[a-z]{1}/g
        let number = /[0-9]{1}/g
        let special = /[^a-zA-Z0-9 ]{1}/g
        if (this.state.validation) {
          if (!val && this.props.isRequired) {
            this.setError(`${this.props.floatingLabel} is Required.`)
          } else if (val.match(spaces)) {
            this.setError(`${this.props.floatingLabel} must not contain any spaces.`)
          } else if (!val.match(bigChar)) {
            this.setError(`${this.props.floatingLabel} must contain at least 1 uppercase letter.`)
          } else if (!val.match(smallChar)) {
            this.setError(`${this.props.floatingLabel} must contain at least 1 lowercase letter.`)
          } else if (!val.match(number)) {
            this.setError(`${this.props.floatingLabel} must contain at least 1 numeral.`)
          } else if (!val.match(special)) {
            this.setError(`${this.props.floatingLabel} must contain at least 1 special character(Space excluded).`)
          } else if (this.state.min && (val.length < this.state.min)) {
            this.setError(`${this.props.floatingLabel} must be mininum length of ${this.state.min}.`)
          } else if (this.state.max && (val.length > this.state.max)) {
            this.setError(`${this.props.floatingLabel} must be maxinum length of ${this.state.max}.`)
          } else {
            this.setState({
              error: ''
            })
            this.callback({
              valid: true,
              value: val,
              name: ev.target.name
            })
            return true
          }
          this.callback({
            valid: false,
            value: '',
            name: ev.target.name
          })
        } else {
          this.callback({
            valid: true,
            value: val,
            name: ev.target.name
          })
        }
        return false
      },
      keyup: (ev, e) => {
        if (this.props.handleKeyUp) {
          this.props.handleKeyUp(ev.keyCode)
        }
      }
    }
  }
  render () {
    return (
      <div>
        <TextField
          hintText={this.props.placeholder}
          floatingLabelText={this.props.floatingLabel}
          name={this.props.name}
          type='password'
          defaultValue={this.props.value}
          errorText={this.state.error}
          fullWidth={this.state.fullWidth}
          onChange={this.handle.change}
          value={this.state.modelValue}
          onKeyUp={this.handle.keyup}
        />
      </div>
    )
  }
}
CPasswordField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  floatingLabel: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  validation: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  modelValue: PropTypes.string
}
export default CPasswordField

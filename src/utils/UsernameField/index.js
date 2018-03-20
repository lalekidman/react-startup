import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
class CUsernameField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
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
        let atPatt = /@{1}/g
        let atRes = val.match(atPatt)
        if (!val && this.props.isRequired) {
          this.setError(`${this.props.floatingLabel} is Required.`)
        } else if (val.match(spaces)) {
          this.setError(`${this.props.floatingLabel} must not contain any spaces.`)
        } else if (atRes && atRes.length > 1) {
          this.setError(`${this.props.floatingLabel} must contain only one(1) \`@\`sign.`)
        } else if (this.props.min && (val.length < this.props.min)) {
          this.setError(`${this.props.floatingLabel} must be minimum length of ${this.props.min}.`)
        } else if (this.props.max && (val.length > this.props.max)) {
          this.setError(`${this.props.floatingLabel} must be maxinum length of ${this.props.max}.`)
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
CUsernameField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  floatingLabel: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  modelValue: PropTypes.string
}
export default CUsernameField

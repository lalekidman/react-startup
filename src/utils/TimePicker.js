import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import PropTypes from 'prop-types'
class CustomerTimePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fullWidth: props.fullWidth || false,
      value: props.defaultValue || '',
    }
  }
  setChanges (props) {
    this.handle.change(this, props.modelValue || null)
  }
  componentDidMount () {
    this.setChanges(this.props)
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
      change: (ev, val) => {
        this.setState({
          modelValue: val
        })
        if (!val && this.props.isRequired) {
          this.setError(`${this.props.floatingLabel} is Required.`)
        } else {
          this.setState({
            error: ''
          })
          this.callback({
            valid: true,
            value: val,
            name: this.props.name
          })
          return true
        }
        this.callback({
          valid: false,
          value: '',
          name: this.props.name
        })
        return false
      }
    }
  }
  render () {
    return (
      <div>
        <TimePicker
          className={this.props.className}
          hintText={this.props.floatingLabel}
          onChange={this.handle.change}
          name={this.props.name}
          value={this.state.modelValue}
          disabled={this.props.isDisabled}
          fullWidth={true}
        />
      </div>
    )
  }
}
CustomerTimePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  floatingLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  modelValue: PropTypes.instanceOf(Date)
}
export default CustomerTimePicker

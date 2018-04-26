import React from 'react'
import DatePickers from 'material-ui/DatePicker'
import PropTypes from 'prop-types'
class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fullWidth: props.fullWidth || false,
      value: props.defaultValue || ''
    }
  }
  setChanges (props) {
    this.handle.change(this, props.modelValue || new Date())
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
        <DatePickers
          hintText={this.props.floatingLabel}
          name={this.props.name}
          fullWidth={this.state.fullWidth}
          onChange={this.handle.change}
          onKeyUp={this.handle.keyup}
          value={this.state.modelValue}
          style={this.props.style}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          shouldDisableDate={this.props.disabledDate}
        />
      </div>
    )
  }
}
DatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  disabledDate: PropTypes.func,
  floatingLabel: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  mode: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  style: PropTypes.object,
  modelValue: PropTypes.instanceOf(Date)
}
export default DatePicker

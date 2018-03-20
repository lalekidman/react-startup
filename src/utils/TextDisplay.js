import React from 'react'
import PropTypes from 'prop-types'
const TextDisplay = (props) => {
  let maxLength = props.maxLength || 0
  let emptyText = props.emptyText ? <i>{props.emptyText}</i> : <i>Empty</i>
  let label = props.label || ''
  let realLabel = emptyText
  const len = label.length
  if (len) {
    if (maxLength >= 1) {
      if (maxLength < len) {
        realLabel = label.substr(0, maxLength).concat('...')
      }
    }
    realLabel = label
  }
  return (
    <span>
      {realLabel}
    </span>
  )
}
TextDisplay.propTypes = {
  maxLength: PropTypes.number,
  emptyText: PropTypes.string
}
export default TextDisplay

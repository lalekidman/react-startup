import React from 'react'
import PropTypes from 'prop-types'
const TextDisplay = (props) => {
  const maxLength = props.maxLength || 0
  const emptyText = props.emptyText ? <i>{props.emptyText}</i> : <i>Empty</i>
  const label = props.label || ''
  let realLabel = label
  const len = label.length
  if (len) {
    if (maxLength >= 1) {
      if (maxLength < len) {
        realLabel = label.substr(0, maxLength).concat('...')
      } 
    }
  } else {
    realLabel = emptyText
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

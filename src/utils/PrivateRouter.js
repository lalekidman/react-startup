import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const PrivateRouter = ({component: Component, isAuthed, needAuthed, redirectTo, ...rest}) => {
  return (<Route {...rest} render={props => {
    return (isAuthed === needAuthed)
      ? <Component {...props} />
      : <Redirect to={{pathname: redirectTo, state: {from: props.location}}} />
  }} />)
}
export default PrivateRouter

import React from 'react'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import Logout from './authentication/logout'
import Wrapper from './wrapper'
export default () => {
  return (
    <div>
      {/* <Route path={'/'} exact component={Dashboard} /> */}
      {/* <Route path={'/dashboard'} exact component={Dashboard} /> */}
      <Route path={'/'} component={Wrapper} />
      <Route path={'/logout'} component={Logout} />
    </div>
  )
}

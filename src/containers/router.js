import React from 'react'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import Dashboard from './dashboard'
import Company from './company'
import Users from './users'
export default () => {
  return (
    <div>
      <Route path={'/'} exact component={Dashboard} />
      <Route path={'/dashboard'} exact component={Dashboard} />
      <Route path={'/company'} component={Company} />
      <Route path={'/users'} component={Users} />
    </div>
  )
}

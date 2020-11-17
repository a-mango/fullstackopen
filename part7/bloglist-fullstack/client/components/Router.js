import React from 'react'
import { Route, Switch } from 'react-router-dom'

import BlogView from 'Components/BlogView'
import UsersView from 'Components/UsersView'

export default () => (
  <Switch>
    <Route exact path="/" component={BlogView} />
    <Route path="/users" component={UsersView} />
  </Switch>
)

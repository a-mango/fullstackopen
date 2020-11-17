import React from 'react'
import { Route, Switch } from 'react-router-dom'

import BlogView from 'Components/BlogView'
import UsersView from 'Components/UsersView'

const Router = () => {
  return (
    <Switch>
      <Route path="/users" component={UsersView} />
      <Route path="/" component={BlogView} />
    </Switch>
  )
}

export default Router

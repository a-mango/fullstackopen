import React from 'react'
import { Route, Switch } from 'react-router-dom'

import UsersView from 'Components/UsersView'
import AboutView from 'Components/AboutView'
import BlogView from 'Components/BlogView'

const Router = () => {
  return (
    <Switch>
      <Route path="/users" component={UsersView} />
      <Route path="/about" component={AboutView} />
      <Route path="/" component={BlogView} />
    </Switch>
  )
}

export default Router

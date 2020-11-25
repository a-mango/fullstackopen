import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import BlogForm from 'Components/BlogView/BlogForm'
import BlogList from 'Components/BlogView/BlogList'
import BlogDetail from 'Components/BlogView/BlogDetail'

const BlogView = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}blogs/:id`}>
        <BlogDetail />
      </Route>
      <Route path={match.path}>
        <BlogList />
        <BlogForm />
      </Route>
    </Switch>
  )
}

export default BlogView

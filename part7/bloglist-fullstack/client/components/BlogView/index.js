import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import BlogForm from 'Components/BlogView/BlogForm'
import BlogList from 'Components/BlogView/BlogList'
import BlogDetail from 'Components/BlogView/BlogDetail'

const BlogView = () => {
  const match = useRouteMatch()

  return (
    <div>
      <Switch>
        <Route path={`${match.path}blogs/:id`}>
          <BlogDetail />
        </Route>
        <Route path={match.path}>
          <h2>Blogs</h2>
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default BlogView

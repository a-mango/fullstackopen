import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import useResource from 'Hooks/use-resource'
import { apiUrl } from 'Utilities/common'
import UserList from 'Components/UsersView/UserList'
import UserDetail from 'Components/UsersView/UserDetail'

const UsersView = () => {
  const [users] = useResource(`${apiUrl}/users`)
  const match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:username`}>
        <UserDetail users={users} />
      </Route>
      <Route path={match.path}>
        <UserList users={users} />
      </Route>
    </Switch>
  )
}

export default UsersView

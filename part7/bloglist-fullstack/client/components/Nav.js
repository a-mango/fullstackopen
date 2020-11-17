import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const style = { padding: '1em' }
  return (
    <header>
      <h1>Bloglist</h1>
      <nav>
        <Link to="/" style={style}>
          Home
        </Link>
        <Link to="/users" style={style}>
          Users
        </Link>
        <Link to="/" style={style}>
          About
        </Link>
      </nav>
    </header>
  )
}

export default Nav

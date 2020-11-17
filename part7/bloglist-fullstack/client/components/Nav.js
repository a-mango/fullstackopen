import React from 'react'
import { Link } from 'react-router-dom'
import LogoutForm from 'Components/LogoutForm'

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
        <Link to="/about" style={style}>
          About
        </Link>
        <LogoutForm />
      </nav>
    </header>
  )
}

export default Nav

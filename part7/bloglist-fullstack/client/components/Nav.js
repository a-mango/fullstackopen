import React from 'react'
import { Link } from 'react-router-dom'
import LogoutForm from 'Components/LogoutForm'

const Nav = () => {
  return (
    <header className="bg-blue-700 text-gray-200 px-6 h-12 flex justify-between items-center">
      <h1 className="">Bloglist</h1>
      <nav className="">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/users" className="nav-item">
          Users
        </Link>
        <Link to="/about" className="nav-item">
          About
        </Link>
        <LogoutForm />
      </nav>
    </header>
  )
}

export default Nav

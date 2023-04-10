import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './nav.module.css'
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to='/'>ATLE</NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <NavLink className="nav-link" to='/'>Home</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to='/about'>About</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to='/contact'>Contact</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/signup">SignUp</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/signin">SignIn</NavLink>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default NavBar
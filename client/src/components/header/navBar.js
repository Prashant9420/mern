import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './nav.module.css'
import 'react-toastify/dist/ReactToastify.min.css';
import {toast} from 'react-toastify';
import { NavLink } from 'react-router-dom'
const NavBar = (props) => {
  const handleLogOut=()=>{
    props.signinChkHandler(false)
    toast("logged out Successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
      theme: "colored",
    });
    localStorage.setItem('userData',JSON.stringify({}))
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to='/'>ATLE</NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    {(props.loginShown)?
      <li class="nav-item active">
        <NavLink className="nav-link" to='/'>Home</NavLink>
      </li>:null}
      {(props.loginShown)?
      <li class="nav-item">
        <NavLink className="nav-link" to='/about'>About</NavLink>
      </li>:null}
      <li class="nav-item">
        <NavLink className="nav-link" to='/contact'>Contact</NavLink>
      </li>
      {(!props.loginShown)?
      <li class="nav-item">
        <NavLink className="nav-link" to="/signup">SignUp</NavLink>
      </li>:null}
      {(!props.loginShown)?
      <li class="nav-item">
        <NavLink className="nav-link" to="/signin">SignIn</NavLink>
      </li>:<li class="nav-item">
        <NavLink className="nav-link" to="/signin" onClick={handleLogOut}>LogOut</NavLink>
      </li>}
    </ul>
  </div>
</nav>
  )
}

export default NavBar
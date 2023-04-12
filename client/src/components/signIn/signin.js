import React, { useState } from 'react';
import style from './signin.module.css';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.min.css';
import {toast} from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function Signin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json();
    console.log(data)
    if (res.status === 200) {
      navigate("/");
      toast("You are successfully logged in!", {
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
    }
    else if(res.status===400){
      toast("Invalid Credentials!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
    else{
      toast("Network Issue!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
    }
  return (
    <div className={style.demo}>
      <label>Sign In</label>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Email"
            multiline
            maxRows={4}
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Password"
            multiline
            maxRows={4}
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
      </Box>
      <Button variant="contained" className={style.btn} onClick={handleSubmit}>Sign In</Button>
      <NavLink to="/signin/forgetpass">Forget Password?</NavLink>
      <NavLink to="/signup">Don't have an account?</NavLink>
    </div>
  );
}

export default Signin;
import React,{useState} from 'react';
import Box from '@mui/material/Box';
import style from './signup.module.css'
import TextField from '@mui/material/TextField';
import { NavLink,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {toast} from 'react-toastify';

export default function Signin() {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    username:"",
    email:"",
    phone:"",
    work:"",
    password:"",
    cpassword:""
  })
  const handleUser=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setUser({...user,[name]:value});
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const {username,email,phone,work,password,cpassword}=user;
    if(phone.length!=10){
      toast("Invalid Phone Number!", {
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
      return;}
    // ---------------------------------------------------
    const resp= await fetch("/sendmail",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({username,email,phone,message:'Welcome '+username,mode:"signup"})
    })
    await resp.json();
    if(resp.status ===200){
      console.log("registered and email sent successfully");
    }
    else{
      toast("Invalid Email!", {
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
      return;
    }
    // =========================================================
    const res = await fetch("https://compiler-mern-app.onrender.com/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,email,phone,work,password,cpassword})
    })
    const data=await res.json();
    if(res.status===401 || !data){
      toast("please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });}
      else if(res.status===422 || !data){
        toast("Eamil already exists", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
          theme: "colored",
        });}
      else if(res.status===400 || !data){
        toast("password not matching", {
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
      // console.log("Invalid Registeration")
    }else{
      toast("Registered Successfully", {
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
      
      console.log("Registered Successfull");
      navigate("/signin")
    }
  }
  return (
    <div className={style.demo}>
    <label>Sign Up</label>
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
          label="Username"
          multiline
          maxRows={4}
          name="username"
          value={user.username}
          onChange={handleUser}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Email"
          // multiline
          maxRows={4}
          name="email"
          value={user.email}
          onChange={handleUser}
        />
      </div>
      <div>
      <TextField
          id="outlined-multiline-flexible"
          label="Phone Number"
          multiline
          maxRows={4}
          name="phone"
          value={user.phone}
          onChange={handleUser}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Occupation"
          multiline
          maxRows={4}
          name="work"
          value={user.work}
          onChange={handleUser}
        />
      </div>
      <div>
      <TextField
          id="outlined-multiline-flexible"
          label="Create Password"
          multiline
          maxRows={4}
          name="password"
          value={user.password}
          onChange={handleUser}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Confirm Password"
          multiline
          maxRows={4}
          name="cpassword"
          value={user.cpassword}
          onChange={handleUser}
        />
      </div>
    </Box>
    <Button variant="contained" className={style.btn} onClick={handleSubmit}>Sign Up </Button>
    <NavLink to="/signin">Already have an account?</NavLink>
    </div>
  );
}

import React,{useState} from 'react'
import style from './contact.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import {toast} from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
const Contact = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  const [phone,setPhone]=useState("");
  const handleMail= async ()=>{
    const res= await fetch("https://compiler-mern-app.onrender.com/sendmail",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({name,email,phone,message,mode:'contact'})
    })
    await res.json();
    if(res.status===200){
      toast("Message Sent!!", {
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
    else if(res.status===401){
      toast("Invalid Phone Number!!", {
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
    else if(res.status===402){
      toast("Invalid Email!!", {
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
      toast("Enter all Fields properly!!", {
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
      <div className={style.info}>
        <div className={style.phone}>
          <PhoneAndroidIcon/>
          +91 7985624948
        </div>
        <div className={style.email}>
          <EmailIcon/>
          prashantpal2468@gmail.com
        </div>
        <div className={style.addr}>
          <HomeIcon/>
          Lucknow, U.P., India
        </div>
      </div>
      <div className={style.git}>
        <h2 style={{borderBottom:'2px solid black',width:'100%',padding:'10px 0px'}}>Get in Touch</h2>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Your Name" variant="outlined" onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Your Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
      <TextField id="outlined-basic" label="Your Phone Number" variant="outlined" onChange={(e)=>setPhone(e.target.value)}/>
    </Box>
    <textarea name="" id="" cols="78" rows="10" style={{borderRadius:'10px',padding:'5px 10px'}} onChange={(e)=>setMessage(e.target.value)}></textarea>
    <Button variant="contained" style={{width:'20%'}} onClick={handleMail}>Send Message</Button>
      </div>
    </div>
  )
}

export default Contact
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.min.css';
import {toast} from 'react-toastify';
import style from './about.module.css'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const About = (props) => {
  const navigate = useNavigate();
  const [data,setData]=useState({});
  useEffect(()=>{if(!props.signinChk){
    toast("You need to Login first!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "info",
      theme: "colored",
    });
    navigate('/signin');}},[])
  // if(localStorage.userData){
  // setData(JSON.parse(localStorage.userData))
  // }
  console.log(localStorage);
  return (
    <div className={style.demo}>
    <div className={style.info}>
      <div>
        <label htmlFor="">UserID:</label>
        <span>&nbsp;{data._id}</span>
      </div>
      <div>
        <label htmlFor="">Name:</label>
        <span>&nbsp;{data.username}</span>
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <span>&nbsp;{data.email}</span>
      </div>
      <div>
        <label htmlFor="">Mobile: </label>
        <span>&nbsp;{data.phone}</span>
      </div>
      <div>
        <label htmlFor="">Profession:&nbsp; </label>
        <span>{data.work}</span>
      </div>
      <Button variant="contained">Edit</Button>
      </div>
    </div>
  )
}

export default About
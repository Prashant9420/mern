import React from 'react'
import style from './home.module.css'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.min.css';
import {toast} from 'react-toastify';
import Compiler from '../compiler/home'
import { useNavigate } from 'react-router-dom'
const Home = (props) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!props.signinChk){
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
      navigate('/signin')
    }
  },[])
  
  return (
    <>
    {(props.signinChk)?
        <Compiler/>:null}
    </>
  ) 
}

export default Home
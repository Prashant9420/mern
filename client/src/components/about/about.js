import React from 'react'
import style from './about.module.css'
import Button from '@mui/material/Button'
const About = () => {
  return (
    <div className={style.demo}>
    <div className={style.info}>
      <div>
        <label htmlFor="">UserID:</label>
        <span>&nbsp;prashant9420</span>
      </div>
      <div>
        <label htmlFor="">Name:</label>
        <span>&nbsp;Prashant Pal</span>
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <span>&nbsp;prashantpal2468@gmail.com</span>
      </div>
      <div>
        <label htmlFor="">Mobile: </label>
        <span>&nbsp;7985624948</span>
      </div>
      <div>
        <label htmlFor="">Profession:&nbsp; </label>
        <span>MERN Stack Developer</span>
      </div>
      <Button variant="contained">Edit</Button>
      </div>
    </div>
  )
}

export default About
import React from 'react'
import style from './pageNotFound.module.css'
import { NavLink } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className={style.notfound2}>
    <div className={style.notfound}>
        <div className={style.notfound404}>
          <h1><strong>Oops!</strong></h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <NavLink to="/">Go To Homepage</NavLink>
      </div>
      </div>
  )
}

export default PageNotFound
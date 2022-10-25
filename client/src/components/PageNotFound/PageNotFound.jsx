import React from 'react';
import NavBar from '../NavBar/NavBar';
import style from './PageNotFound.module.css';

function PageNotFound() {
  return (
    <div className={style.body}>
        <NavBar />
        <div className={style.main_container}>
            <h1 className={style.title}>404 not found</h1>
            <div className={style.not_found_image}/>
        </div>

    </div>
  )
}

export default PageNotFound
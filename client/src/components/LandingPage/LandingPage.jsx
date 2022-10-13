import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={style.container}>
        <h1>Bienvenido a la pagina de Dogs</h1>
        <Link to='/home'>
            <button>Ingresar</button>
        </Link>
    </div>
  )
}

export default LandingPage
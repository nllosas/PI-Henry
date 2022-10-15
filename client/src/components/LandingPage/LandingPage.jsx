import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={style.background}>
      <div className={style.main_container}>
        <div className={style.inner_text_container}>
          <div className={style.title}>
            <h1>We Love Dogs!</h1>
          </div>
          <Link to='/home' className={style.enter_button}>
            Enter
          </Link>
        </div>
        <div className={style.inner_images_container}>
          <div className={style.big_image}/>
          <div className={style.small_image_top_left}/>
          <div className={style.small_image_middle_right}/>
          <div className={style.small_image_bottom_left}/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
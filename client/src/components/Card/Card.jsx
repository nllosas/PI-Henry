import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';
import { GiWeight } from 'react-icons/gi';

function Card({id, name, image, tempers, min_weight, max_weight}) {
  return (
    <Link to={`/home/${id}`} className={style.link}>
      <div className={style.card_container}>
          <div className={style.more_info}>
            <ul>
              <span className={style.temperaments_title}>temperaments:</span>
              {
                tempers.length ? tempers.map(t =>
                  <li key={Math.random()}>{t.name}</li>
                  ) :
                  <p>No temperaments found</p>
                }
            </ul>
          </div>
          <div className={style.card_img}>
            <img src={image} alt="img not found"/>
          </div>
          <h3 className={style.name}>{name}</h3>
          <h5 className={style.weight}><GiWeight/>Weight: {min_weight} - {max_weight} kg</h5>
      </div>
    </Link>
  )
}

export default Card
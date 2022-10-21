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
            <img src={image ? image : "https://tinyurl.com/4e893cj9"} alt="img not found"/>
          </div>
          <h3 className={style.name}>{name}</h3>
          { 
            ((isNaN(min_weight) || !min_weight) && (isNaN(max_weight) || !max_weight)) ?
              '' :
              (isNaN(min_weight) || !min_weight) ?
              <h5 className={style.weight}><GiWeight className={style.weight_icon}/>{max_weight} kg</h5> :
              (isNaN(max_weight) || !max_weight) ?
                <h5 className={style.weight}><GiWeight className={style.weight_icon}/>{min_weight} kg</h5> :
              <h5 className={style.weight}><GiWeight className={style.weight_icon}/> {min_weight} - {max_weight} kg</h5>
          }
      </div>
    </Link>
  )
}

export default Card
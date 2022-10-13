import React from 'react';
import { Link } from 'react-router-dom';

function Card({id, name, image, tempers, min_weight, max_weight}) {
  return (
    <div id={id}>
        <Link to={`/home/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </Link>
        <h6>Weight: {min_weight} - {max_weight} kg</h6>
        <ul>
          Tempers:
          {
            tempers ? tempers.map(t =>
              <li key={Math.random()}>{t.name}</li>
            ) :
            <p>No temperaments found</p>
          }
        </ul>
        <hr />
    </div>
  )
}

export default Card
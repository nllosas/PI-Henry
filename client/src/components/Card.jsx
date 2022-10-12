import React from 'react';
import { Link } from 'react-router-dom';

function Card({id, name, image, temper, weight}) {
  return (
    <div id={id}>
        <Link to={`/dogs/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </Link>
        <h5>{temper}</h5>
        <h6>{weight}</h6>
        <hr />
    </div>
  )
}

export default Card
import React from 'react'

function Card({name, image, temper, weight}) {
  return (
    <div>
        <h3>{name}</h3>
        <h5>{temper}</h5>
        <h6>{weight}</h6>
        <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  )
}

export default Card
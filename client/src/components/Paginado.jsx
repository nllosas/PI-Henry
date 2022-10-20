import React from 'react';
import style from './Paginado.module.css';

function Paginado({breedsPerPage, breedsLoaded, paginado}) {
  const pageNumbers = []

  for (let i=1; i <= Math.ceil(breedsLoaded/breedsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
        <ul className={style.paginado}>
            {
                pageNumbers && pageNumbers.map(number => (
                    <li key={Math.random()}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                
                ))
            }
        </ul>
    </nav>
  )
}

export default Paginado
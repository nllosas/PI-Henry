import React from 'react';
import style from './Paginado.module.css';

function Paginado({breedsPerPage, breedsLoaded, paginado, currentPage}) {
  const pageNumbers = []

  for (let i=1; i <= Math.ceil(breedsLoaded/breedsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
        <ul className={style.paginado}>
            {
                pageNumbers && pageNumbers.map(number => (
                    <li key={number + 'paginado' + Math.random()}>
                        <button onClick={() => paginado(number)} className={number === currentPage ? style.currentPageStyle : style.notCurrentPageStyle}>{number}</button>
                    </li>
                
                ))
            }
        </ul>
    </nav>
  )
}

export default Paginado
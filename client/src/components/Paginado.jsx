import React from 'react'

function Paginado({breedsPerPage, breedsLoaded, paginado}) {
  const pageNumbers = []

  for (let i=1; i <= Math.ceil(breedsLoaded/breedsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
        <ul className='paginado'>
            {
                pageNumbers && pageNumbers.map(number => (
                    <li className={`${number}`} key={Math.random()}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                
                ))
            }
        </ul>
    </nav>
  )
}

export default Paginado
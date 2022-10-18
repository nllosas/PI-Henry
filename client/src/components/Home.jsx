import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Card from './Card';
import Paginado from './Paginado';
import NavBar from './NavBar/NavBar';
import { 
    getBreeds,
    getTemperaments,
    filterBreedsByTemperament,
    filterByCreated,
    sortBreedsByWeight,
    sortBreedsAlphabetically,
} from '../actions';

function Home() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBreeds());
        dispatch(getTemperaments());
    },[dispatch])
    
    const breedsLoaded = useSelector((state) => state.breedsLoaded);
    const temperaments = useSelector((state) => state.temperaments);

    // Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage, setBreedsPerPage] = useState(8);
    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const currentBreeds = breedsLoaded.slice(indexOfFirstBreed, indexOfLastBreed);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //

    // Filters
    const [temperFilterValue, setTemperFilterValue] = useState('All');
    const [createdFilterValue, setCreatedFilterValue] = useState('All');
    const [weightSortValue, setWeightSortValue] = useState('All');
    const [alphabeticalSortValue, setAlphabeticalSortValue] = useState('All');
    //


    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getBreeds());
        setTemperFilterValue("All");
        setCreatedFilterValue("All");
        setWeightSortValue("All");
        setAlphabeticalSortValue("All");
    }

    const handleAlphabeticalSort = (event) => {
        setAlphabeticalSortValue(event.target.value);
        dispatch(sortBreedsAlphabetically(event.target.value));
    }

    const handleWeightSort = (event) => {
        setWeightSortValue(event.target.value);
        dispatch(sortBreedsByWeight(event.target.value));
    }

    const handleFilterTemper = (event) => {
        setTemperFilterValue(event.target.value);
        dispatch(filterBreedsByTemperament(event.target.value));
        setCurrentPage(1);
    }

    const handleFilterCreated = (event) => {
        setCreatedFilterValue(event.target.value);
        dispatch(filterByCreated(event.target.value))
        setCurrentPage(1);
    }

    return (
        <div>
            <NavBar searchBar={true}/>
            <h1>DOGS</h1>
            <button onClick={e => {handleClick(e)}}>
                🔄
            </button>
            <div>
                <select onChange={e => handleAlphabeticalSort(e)} value={alphabeticalSortValue}>
                    <option value="All">Order alphabetically</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                <select onChange={e => handleWeightSort(e)} value={weightSortValue}>
                    <option value="All">Order by Avg Weight</option>
                    <option value="lowHigh">Low to High</option>
                    <option value="highLow">High to Low</option>
                </select>
                <select onChange={e => handleFilterTemper(e)} value={temperFilterValue}>
                    <option value="All">Filter by temper</option>
                    {
                        temperaments?.map(temperament =>
                            <option value={`${temperament.name}`}>{temperament.name}</option>
                        )
                    }
                </select>
                <select onChange={e => {handleFilterCreated(e)}} value={createdFilterValue}>
                    <option value="All">Filtrar by Crated</option>
                    <option value="created">Created</option>
                    <option value="api">API</option>
                </select>
                <Paginado
                    breedsPerPage={breedsPerPage}
                    breedsLoaded={breedsLoaded.length}
                    paginado={paginado}
                />
                <p>Pagina Actual: {currentPage}</p>
            </div>
            <div>
                {
                    breedsLoaded ? 
                        currentBreeds.length ? 
                        currentBreeds.map(e => 
                        <Card
                            id={e.id}
                            name={e.name}
                            image={e.img}
                            tempers={e.temperaments}
                            min_weight={e.min_weight}
                            max_weight={e.max_weight}
                        />
                    ) :
                    <h3>No hay razas</h3> :
                    <img src="https://static.wixstatic.com/media/e1d3bb_7740582dae514842bad1d41fc5910d52~mv2.gif" alt="loading" />
                }
            </div>
        </div>
    )
}

export default Home
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import { 
    getRaces,
    getTemperaments,
    filterRacesByTemperament,
    filterByCreated,
    sortRacesByWeight,
    sortRacesAlphabetically,
} from '../actions';

function Home() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getRaces());
        dispatch(getTemperaments());
    },[dispatch])
    
    const racesLoaded = useSelector((state) => state.racesLoaded);
    const temperaments = useSelector((state) => state.temperaments);

    // Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [racesPerPage, setRacesPerPage] = useState(8);
    const indexOfLastRace = currentPage * racesPerPage;
    const indexOfFirstRace = indexOfLastRace - racesPerPage;
    const currentRaces = racesLoaded.slice(indexOfFirstRace, indexOfLastRace);

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
        dispatch(getRaces());
        setTemperFilterValue("All");
        setCreatedFilterValue("All");
        setWeightSortValue("All");
        setAlphabeticalSortValue("All");
    }

    const handleAlphabeticalSort = (event) => {
        setAlphabeticalSortValue(event.target.value);
        dispatch(sortRacesAlphabetically(event.target.value));
    }

    const handleWeightSort = (event) => {
        setWeightSortValue(event.target.value);
        dispatch(sortRacesByWeight(event.target.value));
    }

    const handleFilterTemper = (event) => {
        setTemperFilterValue(event.target.value);
        dispatch(filterRacesByTemperament(event.target.value));
        setCurrentPage(1);
    }

    const handleFilterCreated = (event) => {
        setCreatedFilterValue(event.target.value);
        dispatch(filterByCreated(event.target.value))
        setCurrentPage(1);
    }

    return (
        <div>
            <h1>AGUANTE LOS PERROS</h1>
            <Link to='/race'>Crear Raza</Link>
            <SearchBar />
            <button onClick={e => {handleClick(e)}}>
                🔄
            </button>
            <div>
                <select onChange={e => handleAlphabeticalSort(e)} value={alphabeticalSortValue}>
                    <option value="All">Orden alfabético</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                <select onChange={e => handleWeightSort(e)} value={weightSortValue}>
                    <option value="All">Ordenar por Peso</option>
                    <option value="minWeight">Peso Minimo</option>
                    <option value="maxWeight">Peso Maximo</option>
                </select>
                <select onChange={e => handleFilterTemper(e)} value={temperFilterValue}>
                    <option value="All">Filtrar por Temperamiento</option>
                    {
                        temperaments?.map(temperament =>
                            <option value={`${temperament.name}`}>{temperament.name}</option>
                        )
                    }
                </select>
                <select onChange={e => {handleFilterCreated(e)}} value={createdFilterValue}>
                    <option value="All">Filtrar por Raza Existente</option>
                    <option value="created">Creadas</option>
                    <option value="api">API</option>
                </select>
                <Paginado
                    racesPerPage={racesPerPage}
                    racesLoaded={racesLoaded.length}
                    paginado={paginado}
                />
                <p>Pagina Actual: {currentPage}</p>
            </div>
            <div>
                {
                    racesLoaded ? 
                        currentRaces.length ? 
                        currentRaces.map(e => 
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
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import { 
    getRaces,
    getTemperaments,
    getRacesByName,
    filterRacesByTemperament,
    filterByCreated,
    sortRacesByWeight,
    sortRacesAlphabetically,
} from '../actions';
function Home() {

    const dispatch = useDispatch();
    const allRaces = useSelector((state) => state.racesLoaded);
    const allTemperaments = useSelector((state) => state.temperamentsLoaded);

    // Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [racesPerPage, setRacesPerPage] = useState(8);
    const indexOfLastRace = currentPage * racesPerPage;
    const indexOfFirstRace = indexOfLastRace - racesPerPage;
    const currentRaces = allRaces.slice(indexOfFirstRace, indexOfLastRace);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //

    // Filters
    const [searchValue, setSearchValue] = useState('');
    const [temperFilterValue, setTemperFilterValue] = useState('All');
    const [createdFilterValue, setCreatedFilterValue] = useState('All');
    const [weightSortValue, setWeightSortValue] = useState('All');
    const [alphabeticalSortValue, setAlphabeticalSortValue] = useState('All');
    //

    useEffect(() => {
        dispatch(getRaces());
        dispatch(getTemperaments());
    },[dispatch])

    const handleSearch = (event) => {
        setSearchValue(event.target.value)
        dispatch(getRacesByName(event.target.value))
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getRaces());
        setTemperFilterValue("All");
        setCreatedFilterValue("All");
        setWeightSortValue("All");
        setAlphabeticalSortValue("All");
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

    const handleWeightSort = (event) => {
        setWeightSortValue(event.target.value);
        dispatch(sortRacesByWeight(event.target.value));
    }

    const handleAlphabeticalSort = (event) => {
        setAlphabeticalSortValue(event.target.value);
        dispatch(sortRacesAlphabetically(event.target.value));
    }

    return (
        <div>
            <h1>AGUANTE LOS PERROS</h1>
            <Link to='/dog'>Crear Raza</Link>
            <input type="text" onChange={e => handleSearch(e)}/>
            <button onClick={e => {handleClick(e)}} value={searchValue}>
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
                        allTemperaments?.map(temperament =>
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
                    allRaces={allRaces.length}
                    paginado={paginado}
                />
                <p>Pagina Actual: {currentPage}</p>
                {
                    currentRaces ? 
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
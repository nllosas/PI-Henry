import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getRaces, getTemperaments } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
function Home() {

    const dispatch = useDispatch();
    const allRaces = useSelector((state) => state.racesLoaded);
    const allTemperaments = useSelector((state) => state.temperamentsLoaded);

    const [currentPage, setCurrentPage] = useState(1);
    const [racesPerPage, setRacesPerPage] = useState(8);
    const indexOfLastRace = currentPage * racesPerPage;
    const indexOfFirstRace = indexOfLastRace - racesPerPage;
    const currentRaces = allRaces.slice(indexOfFirstRace, indexOfLastRace);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getRaces());
        dispatch(getTemperaments());
    },[dispatch])

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getRaces());
    }

    return (
        <div>
            <Link to='/dog'>Crear Raza</Link>
            <h1>AGUANTE LOS PERROS</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            <div>
                <select>
                    <option value="All">Orden alfabético</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                <select>
                    <option value="All">Ordenar por Peso</option>
                    <option value="minWeight">Peso Minimo</option>
                    <option value="maxWeight">Peso Maximo</option>
                </select>
                <select>
                    <option value="All">Filtrar por Temperamiento</option>
                    {
                        allTemperaments?.map(temperament =>
                            <option value={`${temperament.name}`}>{temperament.name}</option>
                        )
                    }
                </select>
                <select>
                    <option value="All">Filtrar por Raza Existente</option>
                    <option value="created">Creadas</option>
                    <option value="api">API</option>
                </select>
                <Paginado
                    racesPerPage={racesPerPage}
                    allRaces={allRaces.length}
                    paginado={paginado}
                />
                {
                    currentRaces ? currentRaces.map(e => 
                        <Card
                            id={e.id}
                            name={e.name}
                            image={e.img.url}
                            temper={e.temperaments}
                            weight={e.weight.metric}
                        />
                    ) :
                    <img src="https://static.wixstatic.com/media/e1d3bb_7740582dae514842bad1d41fc5910d52~mv2.gif" alt="loading" />
                }
            </div>
        </div>
    )
}

export default Home
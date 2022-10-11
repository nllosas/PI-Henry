import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getRaces } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

function Home() {

    const dispatch = useDispatch();
    const allRaces = useSelector((state) => state.racesLoaded);

    useEffect(() => {
        dispatch(getRaces());
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
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
                <select>
                    <option value="Temperament">Temperamento</option>
                    <option value="Alphabetical">Orden alfabético</option>
                    <option value="Weight">Peso</option>
                </select>
                <select>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                {
                    allRaces && allRaces.map(e => 
                        <Card
                            name={e.name}
                            image={e.img.url}
                            temper={e.temperaments}
                            weight={e.weight.metric}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Home
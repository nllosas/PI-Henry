import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getRaceDetail } from '../actions';

function Detail() {

    const dispatch = useDispatch();
    const details = useSelector((state) => state.raceDetail);
    
    const { id } = useParams();

    useEffect(() => {
        dispatch(getRaceDetail(id));
    },[dispatch,id])

    return (
        details[0] ? 
        <div>
            <h2>Nombre de Raza: {details[0].name}</h2>
            <img src={details[0].img.url} alt="img not found" />
            <h4>Peso: {details[0].weight.metric} kg</h4>
            <h4>Altura: {details[0].height.metric} cm</h4>
            <h4>Años de vida: {details[0].life_span.slice(0, -5)} años</h4>
            <h5>Temperamientos: {details[0].temperaments}</h5>
            <Link to='/home'>
                <button>Volver a la home</button>
            </Link>
        </div> : 
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif" alt="loading" />
    )
}

export default Detail
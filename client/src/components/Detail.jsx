import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getRaceDetail, clearDetail } from '../actions';

function Detail() {

    const dispatch = useDispatch();
    var details = useSelector((state) => state.raceDetail);
    
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getRaceDetail(id));

        return () => {
            dispatch(clearDetail());
        }
    },[dispatch,id])

    return (
        details[0] ? 
        <div>
            <h2>Nombre de Raza: {details[0].name}</h2>
            <img src={details[0].img} alt="img not found" />
            <h4>Peso: {details[0].min_weight} - {details[0].max_weight} kg</h4>
            <h4>Altura: {details[0].min_height} - {details[0].max_height} cm</h4>
            {details[0].min_life_span && details[0].max_life_span ? <h4>Años de vida: {details[0].min_life_span} - {details[0].max_life_span} años</h4> : ''}
            {/* <h5>Temperamientos: {details[0].temperaments}</h5> */}
            <Link to='/home'>
                <button>Volver a la home</button>
            </Link>
        </div> : 
        <img src="https://ai-hmi.com/wp-content/plugins/preloader-sws/assets/img/bg-true/fox-fun-walk.gif" alt="loading gif" />
    )
}

export default Detail
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getRaceDetail, clearDetail } from '../../actions';
import style from './Detail.module.css';

function Detail(props) {

    const dispatch = useDispatch();
    var details = useSelector((state) => state.raceDetail);
    
    const { id } = useParams();
    
    //const id  = props.match.params.id;

    useEffect(() => {
        dispatch(getRaceDetail(id));

        return () => {
            dispatch(clearDetail());
        }
    },[dispatch,id])

    return (
        details[0] ? 
        <div className={style.bkg}>
            <img src={details[0].img} alt="img not found" className={style.bkg_img}/>
            <div className={style.filter}/>
            <div className={style.container}>
                <h2>Breed: {details[0].name}</h2>
                <img src={details[0].img} alt="img not found" className={style.breed_img}/>
                <h4>Weight: {details[0].min_weight} - {details[0].max_weight} kg</h4>
                <h4>Height: {details[0].min_height} - {details[0].max_height} cm</h4>
                {details[0].min_life_span && details[0].max_life_span ? <h4>Life span: {details[0].min_life_span} - {details[0].max_life_span} years</h4> : ''}
                <h4>Temperaments: {details[0].temperaments.map(el => `${el.name}, `)}</h4>
                <Link to='/home'>
                    <button>Volver a la home</button>
                </Link>
            </div>
        </div> : 
        <div className={style.loading_screen}>
            <img src="https://ai-hmi.com/wp-content/plugins/preloader-sws/assets/img/bg-true/fox-fun-walk.gif" alt="loading gif" className={style.loading_img} />
        </div>
    )
}

export default Detail
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getBreedDetail, clearDetail } from '../../actions';
import style from './Detail.module.css';
import { CgCloseR } from 'react-icons/cg';
import { GiWeight } from 'react-icons/gi';
import dogHeightIcon from '../../assets/dog-height.svg';

function Detail(props) {

    const dispatch = useDispatch();
    var details = useSelector((state) => state.breedDetail);
    var errors = useSelector((state) => state.errors);
    
    const { id } = useParams();
    
    //const id  = props.match.params.id;

    useEffect(() => {
        dispatch(getBreedDetail(id));

        return () => {
            dispatch(clearDetail());
        }
    },[dispatch,id])

    return (
        details[0] ? 
        <div className={style.bkg}>
            <div className={style.container}>
                <img src={details[0].img} alt="img not found" className={style.bkg_img}/>
                <div className={style.filter}/>
                <div className={details[0].temperaments.length ? style.details : style.details_noTempers}>
                    <Link to='/home' style={{pointerEvents:'none'}}>
                        <button className={style.close_button} style={{pointerEvents:'all'}}><CgCloseR/></button>
                    </Link>
                    <span className={style.name}>{details[0].name}</span>
                    <a href={details[0].img} className={style.breed_img} target="_blank" rel="noopener noreferrer"><img src={details[0].img} alt="img not found"/></a>
                    <ul className={details[0].temperaments.length ? style.temperaments : style.no_temperaments}>
                        {details[0].temperaments.map(temper => <li>{temper.name}</li>)}
                    </ul>
                    <div className={style.more_info}>
                        {
                            ((isNaN(details[0].min_weight) || !details[0].min_weight) && (isNaN(details[0].max_weight) || !details[0].max_weight)) ?
                            '' :
                            (isNaN(details[0].min_weight) || !details[0].min_weight) ?
                            <p className={style.weight}><GiWeight className={style.weight_icon}/>{details[0].max_weight} kg</p> :
                            (isNaN(details[0].max_weight) || !details[0].max_weight) ?
                                <p className={style.weight}><GiWeight className={style.weight_icon}/>{details[0].min_weight} kg</p> :
                            <p className={style.weight}><GiWeight className={style.weight_icon}/> {details[0].min_weight} - {details[0].max_weight} kg</p>
                        }
                        {
                            ((isNaN(details[0].min_height) || !details[0].min_height) && (isNaN(details[0].max_height) || !details[0].max_height)) ?
                            '' :
                            (isNaN(details[0].min_height) || !details[0].min_height) ?
                            <p className={style.height}><img src={dogHeightIcon} alt="dog-height" className={style.height_icon} />{details[0].max_height} cm</p> :
                            (isNaN(details[0].max_height) || !details[0].max_height) ?
                                <p className={style.height}><img src={dogHeightIcon} alt="dog-height" className={style.height_icon} />{details[0].min_height} cm</p> :
                            <p className={style.height}><img src={dogHeightIcon} alt="dog-height" className={style.height_icon} /> {details[0].min_height} - {details[0].max_height} cm</p>
                        }
                        {
                            ((isNaN(details[0].min_life_span) && !details[0].min_life_span) && (isNaN(details[0].max_life_span) && !details[0].max_life_span)) ?
                            console.log(details[0].min_life_span, details[0].max_life_span) :
                            (isNaN(details[0].min_life_span) && !details[0].min_life_span) ?
                            <p className={style.life_span}>Life Span: {details[0].max_life_span} years</p> :
                            (isNaN(details[0].max_life_span) && !details[0].max_life_span) ?
                                <p className={style.life_span}>Life Span: {details[0].min_life_span} years</p> :
                            <p className={style.life_span}>Life Span: {details[0].min_life_span} - {details[0].max_life_span} years</p>
                        }
                    </div>
                </div>
            </div>
        </div>
         : 
        !errors.message && <div className={style.loading_screen}>
            <img src="https://ai-hmi.com/wp-content/plugins/preloader-sws/assets/img/bg-true/fox-fun-walk.gif" alt="loading gif" className={style.loading_img} />
        </div>
    )
}

export default Detail
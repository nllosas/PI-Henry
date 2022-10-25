import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearError, getBreeds } from '../../actions';
import style from './SearchFailed.module.css';

function SearchFailed() {
    const dispatch = useDispatch();
    
    const handleClick = () => {
        dispatch(getBreeds());
        dispatch(clearError());
    }

    const location = useLocation();


    return (
    <div className={style.main_container}>
        <h2>No breeds where found by that name</h2>
        <img src="https://p.kindpng.com/picc/s/671-6712023_1920-x-1279-confused-dog-png-transparent-png.png" alt="not found"/>
        {
            location.pathname !== '/home' ?
                <Link to='/home'>
                    <button onClick={handleClick}>Back to Home</button>
                </Link> :
                <button onClick={handleClick}>Back to Home</button>
        }
    </div>
    )
}

export default SearchFailed
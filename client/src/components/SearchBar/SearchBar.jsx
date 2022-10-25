import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearError, getBreedsByName } from '../../actions';
import style from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';

function SearchBar({paginado}) {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getBreedsByName(searchValue))
        dispatch(clearError())
        setSearchValue('');
        paginado(1);
    }

    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <div>
                <input type="text" onChange={e => handleSearch(e)} value={searchValue} placeholder="Search..." className={style.input}/>
                <button type="submit" className={style.button}><BsSearch/></button>
            </div>
        </form>
    )
}

export default SearchBar
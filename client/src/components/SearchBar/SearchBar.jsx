import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBreedsByName } from '../../actions';
import style from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';

function SearchBar() {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getBreedsByName(searchValue))
        setSearchValue('');
    }

    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <div>
                <input type="text" onChange={e => handleSearch(e)} value={searchValue} placeholder="Buscar..." className={style.input}/>
                <button type="submit" className={style.button}><BsSearch/></button>
            </div>
        </form>
    )
}

export default SearchBar
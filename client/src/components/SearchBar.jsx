import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRacesByName } from '../actions';

function SearchBar() {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getRacesByName(searchValue))
        setSearchValue('');
    }

    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <div>
                <input type="text" onChange={e => handleSearch(e)} value={searchValue} placeholder="Buscar..."/>
                <button type="submit">Buscar</button>
            </div>
        </form>
    )
}

export default SearchBar
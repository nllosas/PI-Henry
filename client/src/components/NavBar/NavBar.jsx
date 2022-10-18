import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import style from '../NavBar/NavBar.module.css';

function NavBar({searchBar}) {
    return (
    <nav className={style.navBar}>
        <div className={style.links_container}>
            <div className={style.dog_icon}/>
            <span className={style.home_link}><Link to='/home' className={style.links}>HOME</Link></span>
            <span className={style.link_separator}>|</span>
            <span className={style.create_link}><Link to='/create' className={style.links}>ADD BREED</Link></span>
        </div>
        { searchBar && <SearchBar /> }
    </nav >
  )
}

export default NavBar
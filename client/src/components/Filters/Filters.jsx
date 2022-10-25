import React from 'react';
import style from './Filters.module.css';
import { GrPowerReset } from 'react-icons/gr';

function Filters({
                    showFilters,
                    temperaments,
                    temperFilterValue,
                    weightSortValue,
                    alphabeticalSortValue,
                    createdFilterValue,
                    handleAlphabeticalSort,
                    handleWeightSort,
                    handleFilterTemper,
                    handleFilterCreated,
                    handleResetFilters
                }) {

    return (
        <div>
            <div className={style.filters_container} style={showFilters ? {opacity: 100 } : {opacity:0, transform: 'translateX(-3rem)', pointerEvents: 'none' }}>
                <select onChange={e => handleAlphabeticalSort(e)} value={alphabeticalSortValue} className={style.alphabetical_sort}>
                    <option value="All" className={style.all}>Sort by Breeds</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                <select onChange={e => handleWeightSort(e)} value={weightSortValue}>
                    <option value="All" className={style.all}>Sort by Avg Weight</option>
                    <option value="lowHigh">Low to High</option>
                    <option value="highLow">High to Low</option>
                </select>
                <select onChange={e => handleFilterTemper(e)} value={temperFilterValue} className={style.temper_filter}>
                    <option value="All" className={style.all}>Filter by temper</option>
                    {
                        temperaments?.map(temperament =>
                            <option key={temperament.name +'filter' + Math.random()} value={`${temperament.name}`}>{temperament.name}</option>
                        )
                    }
                </select>
                <select onChange={e => {handleFilterCreated(e)}} value={createdFilterValue}>
                    <option value="All" className={style.all}>Filter by Origin</option>
                    <option value="created">Created</option>
                    <option value="api">API</option>
                </select>
                <button onClick={e => {handleResetFilters(e)}}>
                    <GrPowerReset className={style.reset_filters}/>
                </button>
            </div>
        </div>
    )
}

export default Filters
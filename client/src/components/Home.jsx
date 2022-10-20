import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Card from './Card/Card';
import Paginado from './Paginado';
import NavBar from './NavBar/NavBar';
import style from './Home.module.css';
import { IoFilterSharp } from 'react-icons/io5';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { 
    getBreeds,
    getTemperaments,
    filterBreedsByTemperament,
    filterByCreated,
    sortBreedsByWeight,
    sortBreedsAlphabetically,
} from '../actions';

function Home() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBreeds());
        dispatch(getTemperaments());
    },[dispatch])
    
    const breedsLoaded = useSelector((state) => state.breedsLoaded);
    const temperaments = useSelector((state) => state.temperaments);

    // Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage, setBreedsPerPage] = useState(8);
    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const currentBreeds = breedsLoaded.slice(indexOfFirstBreed, indexOfLastBreed);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //

    // Filters
    const [showFilters, setShowFilters] = useState(false);
    const [temperFilterValue, setTemperFilterValue] = useState('All');
    const [createdFilterValue, setCreatedFilterValue] = useState('All');
    const [weightSortValue, setWeightSortValue] = useState('All');
    const [alphabeticalSortValue, setAlphabeticalSortValue] = useState('All');
    //


    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getBreeds());
        setTemperFilterValue("All");
        setCreatedFilterValue("All");
        setWeightSortValue("All");
        setAlphabeticalSortValue("All");
    }

    const handleAlphabeticalSort = (event) => {
        setAlphabeticalSortValue(event.target.value);
        dispatch(sortBreedsAlphabetically(event.target.value));
    }

    const handleWeightSort = (event) => {
        setWeightSortValue(event.target.value);
        dispatch(sortBreedsByWeight(event.target.value));
    }

    const handleFilterTemper = (event) => {
        setTemperFilterValue(event.target.value);
        dispatch(filterBreedsByTemperament(event.target.value));
        setCurrentPage(1);
    }

    const handleFilterCreated = (event) => {
        setCreatedFilterValue(event.target.value);
        dispatch(filterByCreated(event.target.value))
        setCurrentPage(1);
    }

    const handleFilterActivation = () => {
        showFilters ? setShowFilters(false) : setShowFilters(true);
    }

    const handlePreviousPage = () => {
        const prevPage = currentPage > 1 ? currentPage-1 : 1;
        console.log(currentPage, prevPage);
        setCurrentPage(prevPage);
    }

    const handleNextPage = () => {
        const nextPage = currentPage < Math.ceil(breedsLoaded.length/breedsPerPage) ? currentPage+1 : Math.ceil(breedsLoaded.length/breedsPerPage);
        console.log(Math.ceil(breedsLoaded.length/breedsPerPage), currentPage, nextPage);
        setCurrentPage(nextPage);
    }

    return (
        <div className={style.body}>
            <NavBar searchBar={true} paginado={paginado}/>
            <div className={style.header}>
                <h1 className={style.title}>Dog Breeds</h1>
                <input type="checkbox" id="showFilters" className={style.show_filters_input} onClick={handleFilterActivation}/>
                <label for="showFilters" className={style.show_filters_label}><IoFilterSharp/></label>
            </div>
            {showFilters && 
            <div className={style.filters}>
                <div className={style.filters_container}>
                    <select onChange={e => handleAlphabeticalSort(e)} value={alphabeticalSortValue}>
                        <option value="All">Order alphabetically</option>
                        <option value="asc">A-Z</option>
                        <option value="des">Z-A</option>
                    </select>
                    <select onChange={e => handleWeightSort(e)} value={weightSortValue}>
                        <option value="All">Order by Avg Weight</option>
                        <option value="lowHigh">Low to High</option>
                        <option value="highLow">High to Low</option>
                    </select>
                    <select onChange={e => handleFilterTemper(e)} value={temperFilterValue}>
                        <option value="All">Filter by temper</option>
                        {
                            temperaments?.map(temperament =>
                                <option key={temperament.name +1} value={`${temperament.name}`}>{temperament.name}</option>
                            )
                        }
                    </select>
                    <select onChange={e => {handleFilterCreated(e)}} value={createdFilterValue}>
                        <option value="All">Filtrar by Crated</option>
                        <option value="created">Created</option>
                        <option value="api">API</option>
                    </select>
                    <button onClick={e => {handleClick(e)}}>
                        🔄
                    </button>
                </div>
            </div>}
            <div className={style.cards}>
                <button className={style.prev} onClick={handlePreviousPage}><GrPrevious className={style.prev}/></button>
                {
                    breedsLoaded ? 
                        currentBreeds.length ? 
                        currentBreeds.map(e => 
                        <Card
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            image={e.img}
                            tempers={e.temperaments}
                            min_weight={e.min_weight}
                            max_weight={e.max_weight}
                        />
                    ) :
                    <h3>No hay razas</h3> :
                    <img src="https://static.wixstatic.com/media/e1d3bb_7740582dae514842bad1d41fc5910d52~mv2.gif" alt="loading" />
                }
                <button className={style.next} onClick={handleNextPage}><GrNext className={style.prev}/></button>
            </div>
            <div className={style.paginado_container}>
                <p className={style.current_page}>Current Page: {currentPage}</p>
                <Paginado
                    breedsPerPage={breedsPerPage}
                    breedsLoaded={breedsLoaded.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
}

export default Home
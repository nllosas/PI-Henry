import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Card from './Card/Card';
import Paginado from './Paginado/Paginado';
import NavBar from './NavBar/NavBar';
import Filters from './Filters/Filters';
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
    /* const [breedsPerPage, setBreedsPerPage] = useState(8); */
    const breedsPerPage = 8;
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


    const handleResetFilters = (event) => {
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
                <button className={style.show_filters_button} onClick={handleFilterActivation}><IoFilterSharp/></button>
            </div>
            {<Filters 
                                showFilters={showFilters}
                                temperaments={temperaments}
                                temperFilterValue={temperFilterValue}
                                createdFilterValue={createdFilterValue}
                                weightSortValue={weightSortValue}
                                alphabeticalSortValue={alphabeticalSortValue}
                                handleAlphabeticalSort={handleAlphabeticalSort}
                                handleWeightSort={handleWeightSort}
                                handleFilterTemper={handleFilterTemper}
                                handleFilterCreated={handleFilterCreated}
                                handleResetFilters={handleResetFilters}
                            />
            }
            <div className={style.cards}>
                {currentPage > 1 ? <button className={style.prev} onClick={handlePreviousPage}><GrPrevious className={style.prev}/></button> : <div className={style.prev_empty}/>}
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
                    <h3>No breeds found</h3> :
                    <img src="https://static.wixstatic.com/media/e1d3bb_7740582dae514842bad1d41fc5910d52~mv2.gif" alt="loading" />
                }
                {currentPage < Math.ceil(breedsLoaded.length/breedsPerPage) ? <button className={style.next} onClick={handleNextPage}><GrNext className={style.prev}/></button> : <div className={style.next_empty}/>}
            </div>
            <div className={style.paginado_container}>
                <Paginado
                    breedsPerPage={breedsPerPage}
                    breedsLoaded={breedsLoaded.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default Home
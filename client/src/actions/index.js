import axios from 'axios';

export const GET_RACES = 'GET_RACES';
export const GET_RACE_DETAIL = 'GET_RACE_DETAIL';
export const GET_RACES_BY_NAME = 'GET_RACE_BY_NAME';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const POST_RACE = 'POST_RACE';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export const getRaces = () => {
    return async function(dispatch) {
        var json = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({ type: GET_RACES, payload: json.data })
        // fetch(`http://localhost:3001/dogs`)
        // .then(response => response.json())
        // .then((data) => dispatch({ type: GET_RACES, payload: data}));
    };
};

export const getRaceDetail = (raceId) => {
    return async function(dispatch) {
        var json = await axios.get(`http://localhost:3001/dogs/${raceId}`);
        return dispatch({ type: GET_RACE_DETAIL, payload: json.data });
        // fetch(`http://localhost:3001/dogs/${raceId}`)
        // .then(response => response.json())
        // .then((data) => dispatch({ type: GET_RACE_DETAIL, payload: data}));
    };
};

export const getRacesByName = (name) => {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({ type: GET_RACES_BY_NAME, payload: json.data })
            // fetch(`http://localhost:3001/dogs?name=${name}`)
            // .then(response => response.json())
            // .then((data) => dispatch({ type: GET_RACES_BY_NAME, payload: data})); 
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const getTemperaments = () => {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
    }
};

export const postRace = (payload) => {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/dogs', payload);
        console.log(response);
        return response;
    }
}

export const filterRacesByTemperament = (temperSelected) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperSelected
    }
};

export const filterByCreated = (filterSelected) => {
    return {
        type: FILTER_BY_CREATED,
        payload: filterSelected
    }
};

export const sortRacesByWeight = (weightOption) => {
    return {
        type: SORT_BY_WEIGHT,
        payload: weightOption
    }
};

export const sortRacesAlphabetically = (sortOption) => {
    return {
        type: SORT_ALPHABETICALLY,
        payload: sortOption
    }
};

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
        payload: {}
    }
};
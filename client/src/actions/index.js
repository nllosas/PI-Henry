import axios from 'axios';

export const GET_RACES = 'GET_RACES';
export const GET_RACE_DETAIL = 'GET_RACE_DETAIL';
export const GET_RACES_BY_NAME = 'GET_RACE_BY_NAME';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';

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
        var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({ type: GET_RACES_BY_NAME, payload: json.data })
        // fetch(`http://localhost:3001/dogs?name=${name}`)
        // .then(response => response.json())
        // .then((data) => dispatch({ type: GET_RACES_BY_NAME, payload: data}));
    };
};

export const getTemperaments = () => {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
    }
}
import axios from 'axios';

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREED_DETAIL = 'GET_BREED_DETAIL';
export const GET_BREEDS_BY_NAME = 'GET_BREEDS_BY_NAME';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const POST_BREED = 'POST_BREED';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const getBreeds = () => {
    return async function(dispatch) {
        var json = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({ type: GET_BREEDS, payload: json.data })
        // fetch(`http://localhost:3001/dogs`)
        // .then(response => response.json())
        // .then((data) => dispatch({ type: GET_BREEDS, payload: data}));
    };
};

export const getBreedDetail = (breedId) => {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${breedId}`);
            return dispatch({ type: GET_BREED_DETAIL, payload: json.data });
        } catch (error) {
            return dispatch( {type: SEARCH_FAILED, payload: error})
        }
    };
};

export const getBreedsByName = (name) => {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({ type: GET_BREEDS_BY_NAME, payload: json.data }); 
        } catch (error) {
            return dispatch( {type: SEARCH_FAILED, payload: error})
            /* console.log(error.message); */
        }
    };
};

export const getTemperaments = () => {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/temperaments');
            return dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const postBreed = (payload) => {
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/dogs', payload);
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const filterBreedsByTemperament = (temperSelected) => {
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

export const sortBreedsByWeight = (weightOption) => {
    return {
        type: SORT_BY_WEIGHT,
        payload: weightOption
    }
};

export const sortBreedsAlphabetically = (sortOption) => {
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

export const clearError = () => {
    return {
        type: CLEAR_ERROR,
        payload: {}
    }
}
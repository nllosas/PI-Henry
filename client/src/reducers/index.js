import { GET_RACES, GET_RACE_DETAIL, GET_RACES_BY_NAME } from '../actions/index.js';

const initialState = {
    racesLoaded: [],
    raceDetail: {}
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_RACES:
            return {
                ...state,
                racesLoaded: action.payload
            };
        case GET_RACE_DETAIL:
            return {
                ...state,
                raceDetail: action.payload
            };
        case GET_RACES_BY_NAME:
            return {
                ...state,
                racesLoaded: action.payload
            }
        default:
            return {...state};
    };
};

export default rootReducer;
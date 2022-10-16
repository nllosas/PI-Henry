import { 
    GET_RACES,
    GET_RACE_DETAIL,
    GET_RACES_BY_NAME,
    GET_TEMPERAMENTS,
    POST_RACE,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_CREATED,
    SORT_ALPHABETICALLY,
    SORT_BY_WEIGHT,
    CLEAR_DETAIL,
} from '../actions/index.js';

const initialState = {
    allRaces: [],
    racesLoaded: [],
    raceDetail: {},
    temperaments: [],
    errors: {}
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_RACES:
            return {
                ...state,
                allRaces: action.payload,
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
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case POST_RACE:
            return {
                ...state,
            }
        case FILTER_BY_TEMPERAMENT:
            var allRaces = state.allRaces;
            const temperFiltered = action.payload === 'All' ?
                allRaces :
                allRaces.filter(race => race.temperaments.some(t => t.name === action.payload));

            return {
                ...state,
                racesLoaded: temperFiltered
            }
        case FILTER_BY_CREATED:
            allRaces = state.allRaces;
            const createdFiltered = action.payload === 'All' ?
            allRaces :
            action.payload === 'created' ?
                allRaces.filter(race => race.createdInDb) :
                allRaces.filter(race => !race.createdInDb);

            return {
                ...state,
                racesLoaded: createdFiltered
            }
        case SORT_BY_WEIGHT:
            allRaces = state.racesLoaded;
            const weightSorted = action.payload === 'All' ?
                allRaces :
                action.payload === 'minWeight' ?
                    allRaces.sort((a, b) => (Number(a.min_weight) > Number(b.min_weight)) ? 1 : (Number(a.min_weight) < Number(b.min_weight)) ? -1 : 0) :
                    allRaces.sort((a, b) => (Number(a.max_weight) > Number(b.max_weight)) ? 1 : (Number(a.max_weight) < Number(b.max_weight)) ? -1 : 0);

            return {
                ...state,
                racesLoaded: weightSorted
            }
        case SORT_ALPHABETICALLY:
            allRaces = state.racesLoaded;
            const racesSorted = action.payload === 'All' ?
                allRaces :
                action.payload === 'asc' ? 
                    allRaces.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 ) : 
                    allRaces.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0 );
            return {
                ...state, 
                racesLoaded: racesSorted,
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                raceDetail: action.payload
            }
        default:
            return {...state};
    };
};

export default rootReducer;
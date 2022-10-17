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
            const calc_avg_weight = (min_weight, max_weight) => {
                let avg = 0;
                min_weight = Number(min_weight);
                max_weight = Number(max_weight);
                if (min_weight && max_weight) {
                    avg = (min_weight + max_weight) / 2;
                } else {
                    avg = !min_weight ? !max_weight ? 0 : max_weight : min_weight;
                }
                return avg;
            }

            const weightSorted = action.payload === 'All' ?
                allRaces :
                action.payload === 'lowHigh' ?
                    allRaces.sort((a, b) => (calc_avg_weight(a.min_weight, a.max_weight) > calc_avg_weight(b.min_weight, b.max_weight)) ? 1 : (calc_avg_weight(a.min_weight, a.max_weight) < calc_avg_weight(b.min_weight, b.max_weight)) ? -1 : 0) :
                    allRaces.sort((a, b) => (calc_avg_weight(b.min_weight, b.max_weight) > calc_avg_weight(a.min_weight, a.max_weight)) ? 1 : (calc_avg_weight(b.min_weight, b.max_weight) < calc_avg_weight(a.min_weight, a.max_weight)) ? -1 : 0);

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
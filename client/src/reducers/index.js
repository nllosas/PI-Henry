import { 
    GET_BREEDS,
    GET_BREED_DETAIL,
    GET_BREEDS_BY_NAME,
    GET_TEMPERAMENTS,
    POST_BREED,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_CREATED,
    SORT_ALPHABETICALLY,
    SORT_BY_WEIGHT,
    CLEAR_DETAIL,
} from '../actions/index.js';

const initialState = {
    allBreeds: [],
    breedsLoaded: [],
    breedDetail: {},
    temperaments: [],
    errors: {}
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_BREEDS:
            return {
                ...state,
                allBreeds: action.payload,
                breedsLoaded: action.payload
            };
        case GET_BREED_DETAIL:
            return {
                ...state,
                breedDetail: action.payload
            };
        case GET_BREEDS_BY_NAME:
            return {
                ...state,
                breedsLoaded: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case POST_BREED:
            return {
                ...state,
            }
        case FILTER_BY_TEMPERAMENT:
            var allBreeds = state.allBreeds;
            const temperFiltered = action.payload === 'All' ?
                allBreeds :
                allBreeds.filter(breed => breed.temperaments.some(t => t.name === action.payload));

            return {
                ...state,
                breedsLoaded: temperFiltered
            }
        case FILTER_BY_CREATED:
            allBreeds = state.allBreeds;
            const createdFiltered = action.payload === 'All' ?
            allBreeds :
            action.payload === 'created' ?
                allBreeds.filter(breed => breed.createdInDb) :
                allBreeds.filter(breed => !breed.createdInDb);

            return {
                ...state,
                breedsLoaded: createdFiltered
            }
        case SORT_BY_WEIGHT:
            const breedsLoaded = state.breedsLoaded;
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
                breedsLoaded :
                action.payload === 'lowHigh' ?
                    breedsLoaded.sort((a, b) => (calc_avg_weight(a.min_weight, a.max_weight) > calc_avg_weight(b.min_weight, b.max_weight)) ? 1 : (calc_avg_weight(a.min_weight, a.max_weight) < calc_avg_weight(b.min_weight, b.max_weight)) ? -1 : 0) :
                    breedsLoaded.sort((a, b) => (calc_avg_weight(b.min_weight, b.max_weight) > calc_avg_weight(a.min_weight, a.max_weight)) ? 1 : (calc_avg_weight(b.min_weight, b.max_weight) < calc_avg_weight(a.min_weight, a.max_weight)) ? -1 : 0);

            return {
                ...state,
                breedsLoaded: weightSorted
            }
        case SORT_ALPHABETICALLY:
            allBreeds = state.breedsLoaded;
            const breedsSorted = action.payload === 'All' ?
                allBreeds :
                action.payload === 'asc' ? 
                    allBreeds.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 ) : 
                    allBreeds.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0 );
            return {
                ...state, 
                breedsLoaded: breedsSorted,
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                breedDetail: action.payload
            }
        default:
            return {...state};
    };
};

export default rootReducer;
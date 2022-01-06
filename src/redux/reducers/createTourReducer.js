import * as TOUR_TYPES from '../constants/createTourConstant';
// import * as dateUtils from '../../utils/date';

const INIT_STATE = {
    name: "",
    content: "",
    hashtags: [],
    services: [],
    image: null,
    tour: [],
    isFetching: false,
    error: null,
}


const createTourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.ADD_TOUR: {   // them tour (chua cap nhat len database)
            // var dateStr = dateUtils.convertDateToStr(action.payload.date);
            return {
                ...state,
                name: action.payload.name,
                tour: [...state.tour, { date: action.payload.date, locations: [] }]
            }
        }
        case TOUR_TYPES.ADD_NEW_DATE: {
            var newDate = new Date(state.tour[state.tour.length - 1].date);
            newDate.setDate(newDate.getDate() + 1);
            // dateStr = dateUtils.convertDateToStr(newDate);

            return {
                ...state,
                tour: [...state.tour, {
                    date: newDate,
                    locations: [],
                }]
            }
        }
        case TOUR_TYPES.ADD_NEW_LOCATION: {

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: [
                        ...date.locations,
                        action.payload
                    ]
                } : date)
            }
        }
        case TOUR_TYPES.DELETE_DATE: {
            return {
                ...state,
                tour: [
                    ...state.tour.slice(0, action.payload.indexDate),
                    ...state.tour.slice(action.payload.indexDate + 1)
                ]
            }
        }
        case TOUR_TYPES.DELETE_LOCATION: {
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: [
                        ...date.locations.slice(0, action.payload.indexLocation),
                        ...date.locations.slice(action.payload.indexLocation + 1)
                    ]

                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_DATE: {
            // dateStr = dateUtils.convertDateToStr(action.payload.newDate);
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    date: action.payload.newDate
                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_LOCATION: {

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: date.locations.map((loc, j) => j === action.payload.indexLocation ?
                        // location: location._id,
                        // cost: cost,
                        action.payload : loc)
                } : date)
            }
        }
        case TOUR_TYPES.RESET_TOUR: {
            return {
                ...state,
                name: "",
                tour: [],
                image: null,
                hashtags: "",
                content: "",
                services: []
            }
        }
        case TOUR_TYPES.UPDATE_INFO: {
            return {
                ...state,
                name: action.payload.name,
                image: action.payload.image,
                hashtags: action.payload.hashtags,
                content: action.payload.content,
            }
        }
        case TOUR_TYPES.ADD_SERVICE: {
            return {
                ...state,
                services: [...state.services, action.payload.service]
            }
        }
        case TOUR_TYPES.UPDATE_SERVICE: {
            return {
                ...state,
                services: state.services.map((item, index) => index === action.payload.index ? action.payload.service : item)
            }
        }
        case TOUR_TYPES.DELETE_SERVICE: {
            return {
                ...state,
                services: [
                    ...state.services.slice(0, action.payload.index),
                    ...state.services.slice(action.payload.index + 1)
                ]
            }
        }
        case TOUR_TYPES.LOAD_TOUR: {
            return {
                ...state,
                ...action.payload.tour
            }
        }
        default: {
            return state
        }
    }
}

export default createTourReducer;

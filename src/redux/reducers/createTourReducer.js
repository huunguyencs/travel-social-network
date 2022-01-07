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
    cost: 0
}


const createTourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.CREATE_TOUR: {   // them tour (chua cap nhat len database)
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
                hashtags: [],
                content: "",
                services: [],
                cost: 0
            }
        }
        case TOUR_TYPES.UPDATE_INFO: {
            return {
                ...state,
                name: action.payload.name,
                image: action.payload.image,
                hashtags: action.payload.hashtags,
                content: action.payload.content,
                cost: action.payload.cost
            }
        }
        case TOUR_TYPES.ADD_SERVICE: {
            return {
                ...state,
                cost: state.cost + action.payload.service.cost,
                services: [...state.services, action.payload.service]
            }
        }
        case TOUR_TYPES.UPDATE_SERVICE: {

            let newCost = state.cost;
            let newService = state.services.map((item, index) => {
                if (index === action.payload.index) {
                    newCost = newCost - item.cost + action.payload.service.cost;
                    return action.payload.service;
                }
                else return item
            })

            return {
                ...state,
                cost: newCost,
                services: newService
            }
        }
        case TOUR_TYPES.DELETE_SERVICE: {

            let newCost = state.cost - state.services[action.payload.index].cost;


            return {
                ...state,
                cost: newCost,
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

import * as TOUR_TYPES from '../constants/createTourConstant';
// import * as dateUtils from '../../utils/date';

const INIT_STATE = {
    name: "",
    content: "",
    hashtags: [],
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
                tour: [{ date: action.payload.date, locations: [], description: '', services: [] }]
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
                    description: '',
                    services: []
                }]
            }
        }
        case TOUR_TYPES.ADD_NEW_LOCATION: {
            var new_loc = {
                description: '',
                cost: 0,
                time: '',
                services: []
            }
            if (action.payload.location) {
                new_loc.location = action.payload.location;
            }
            else {
                new_loc.locationName = action.payload.locationName;
            }

            console.log(new_loc);

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: [
                        ...date.locations,
                        new_loc
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
            // console.log(action.payload)
            let newCost = state.cost - state.tour[action.payload.indexDate].locations[action.payload.indexLocation].cost;

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: [
                        ...date.locations.slice(0, action.payload.indexLocation),
                        ...date.locations.slice(action.payload.indexLocation + 1)
                    ]
                } : date),
                cost: newCost
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
        case TOUR_TYPES.UPDATE_DESCRIPTION_DATE: {
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    description: action.payload.description
                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_LOCATION: {

            let newCost = action.payload.cost ? state.cost - state.tour[action.payload.indexDate].locations[action.payload.indexLocation].cost + action.payload.cost : state.cost
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: date.locations.map((loc, j) => j === action.payload.indexLocation ? {
                        ...loc,
                        location: action.payload?.location || loc.location,
                        cost: action.payload?.cost || loc.cost,
                        description: action.payload?.description || loc.description,
                        time: action.payload?.time || loc.time,
                    } : loc)
                } : date),
                cost: newCost
            }
        }

        case TOUR_TYPES.UPDATE_INFO: {
            return {
                ...state,
                name: action.payload.name,
                hashtags: action.payload.hashtags,
                content: action.payload.content,
                cost: action.payload.cost
            }
        }
        case TOUR_TYPES.CHANGE_IMAGE: {
            return {
                ...state,
                image: action.payload.image
            }
        }
        case TOUR_TYPES.ADD_SERVICE_DATE: {
            return {
                ...state,
                cost: state.cost + action.payload.service.cost,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    services: [
                        ...date.services,
                        action.payload.service
                    ]
                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_SERVICE_DATE: {
            let newCost = state.cost - state.tour[action.payload.indexDate].services[action.payload.indexService].cost + action.payload.cost;

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    services: date.services.map((service, index) => index === action.payload.indexService ? {
                        ...service,
                        cost: action.payload.cost,
                        description: action.payload.description
                    } : service)
                } : date),
                cost: newCost
            }
        }
        case TOUR_TYPES.DELETE_SERVICE_DATE: {

            let newCost = state.cost - state.tour[action.payload.indexDate].services[action.payload.indexService].cost;

            return {
                ...state,
                cost: newCost,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    services: [
                        ...date.services.slice(0, action.payload.indexService),
                        ...date.services.slice(action.payload.indexService + 1)
                    ]
                } : date)
            }
        }
        case TOUR_TYPES.ADD_SERVICE_LOCATION: {
            return {
                ...state,
                cost: state.cost + action.payload.service.cost,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: date.locations.map((location, iLoc) => iLoc === action.payload.indexLocation ? {
                        ...location,
                        services: [
                            ...location.services,
                            action.payload.service
                        ]
                    } : location)
                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_SERVICE_LOCATION: {
            let newCost = state.cost - state.tour[action.payload.indexDate].locations[action.payload.indexLocation].services[action.payload.indexService].cost + action.payload.cost;

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: date.locations.map((location, iLoc) => iLoc === action.payload.indexLocation ? {
                        ...location,
                        services: location.services.map((service, iSer) => iSer === action.payload.indexService ? {
                            ...service,
                            cost: action.payload.cost,
                            description: action.payload.description
                        } : service)
                    } : location)
                } : date),
                cost: newCost
            }
        }
        case TOUR_TYPES.DELETE_SERVICE_LOCATION: {

            let newCost = state.cost - state.tour[action.payload.indexDate].locations[action.payload.indexLocation].services[action.payload.indexService].cost;

            return {
                ...state,
                cost: newCost,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    locations: date.locations.map((location, iLoc) => iLoc === action.payload.indexLocation ? {
                        ...location,
                        services: [
                            ...date.services.slice(0, action.payload.indexService),
                            ...date.services.slice(action.payload.indexService + 1)
                        ]
                    } : location)
                } : date)
            }
        }
        case TOUR_TYPES.LOAD_TOUR: {
            return {
                ...state,
                ...action.payload.tour
            }
        }
        case TOUR_TYPES.RESET_TOUR: {
            return {
                name: "",
                content: "",
                hashtags: [],
                image: null,
                tour: [],
                isFetching: false,
                error: null,
                cost: 0
            }
        }
        default: {
            return state
        }
    }
}

export default createTourReducer;

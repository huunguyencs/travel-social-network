import * as TOUR_TYPES from '../constants/tourConstant';
import * as dateUtils from '../../utils/date';

const INIT_STATE = {
    name: null,
    tour: [],
    isFetching: false,
    error: null,
}


const tourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.ADD_TOUR: {
            var dateStr = dateUtils.convertDateToStr(action.payload.date);
            return {
                ...state,
                name: action.payload.name,
                tour: [...state.tour, { time: dateStr, tour: [] }]
            }
        }
        case TOUR_TYPES.ADD_NEW_DATE: {
            var newDate = dateUtils.convertStrToDate(state.tour[state.tour.length - 1].time);
            newDate.setDate(newDate.getDate() + 1);
            dateStr = dateUtils.convertDateToStr(newDate);

            return {
                ...state,
                tour: [...state.tour,
                {
                    time: dateStr,
                    tour: [],
                }
                ]
            }
        }
        case TOUR_TYPES.ADD_NEW_LOCATION: {
            const { location, cost } = action.payload;
            // goi api lay du lieu tu location id
            console.log(location);

            const image = "/login-1.jpeg";
            const province = "Hà Nội";

            const newLocation = {
                id: location.id,
                img: image,
                location: location.name,
                province: province,
                cost: cost,
            }

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    tour: [
                        ...date.tour,
                        newLocation
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
                    tour: [
                        ...date.tour.slice(0, action.payload.indexLocation),
                        ...date.tour.slice(action.payload.indexLocation + 1)
                    ]

                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_DATE: {
            dateStr = dateUtils.convertDateToStr(action.payload.newDate);
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    time: dateStr
                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_LOCATION: {
            // goi api lay du lieu
            const { location, cost } = action.payload;
            console.log(location)

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    tour: date.tour.map((loc, j) => j === action.payload.indexLocation ? {
                        ...loc,
                        id: location.id,
                        location: location.name,
                        cost: cost
                    } : loc)
                } : date)
            }
        }
        case TOUR_TYPES.RESET_TOUR: {
            return {
                ...state,
                name: "",
                tour: []
            }
        }
        default: {
            return state
        }
    }
}

export default tourReducer;
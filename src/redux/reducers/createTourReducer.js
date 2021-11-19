import * as TOUR_TYPES from '../constants/createTourConstant';
import * as dateUtils from '../../utils/date';

const INIT_STATE = {
    name: "",
    content: "",
    hashtag: "",
    image: null,
    tour: [],
    isFetching: false,
    error: null,
}


const createTourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.ADD_TOUR: {   // them tour (chua cap nhat len database)
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
            // console.log(location);

            const newLocation = {
                _id: 1321,
                location: location,
                province: "Hà Nội",
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

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...date,
                    tour: date.tour.map((loc, j) => j === action.payload.indexLocation ? {
                        ...loc,
                        location: location,
                        cost: cost,
                    } : loc)
                } : date)
            }
        }
        case TOUR_TYPES.RESET_TOUR: {
            return {
                ...state,
                name: "",
                tour: [],
                image: null,
                hashtag: "",
                content: "",
            }
        }
        case TOUR_TYPES.UPDATE_INFO: {
            return {
                ...state,
                name: action.payload.name,
                image: action.payload.image,
                hashtag: action.payload.hashtag,
                content: action.payload.content,
            }
        }
        default: {
            return state
        }
    }
}

export default createTourReducer;

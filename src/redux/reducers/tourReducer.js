import * as TOUR_TYPES from '../constants/tourConstant';
import * as dateUtils from '../../utils/date';

const initState = {
    name: "",
    tour: []
}


const tourReducer = (state = initState, action) => {
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
                img: image,
                location: location,
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
            var dateStr = dateUtils.convertDateToStr(action.payload.newDate);
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? {
                    ...state,
                    time: dateStr
                } : date)
            }
        }
        case TOUR_TYPES.UPDATE_LOCATION: {
            return {

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

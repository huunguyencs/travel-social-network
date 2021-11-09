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
            const { locationId, cost } = action.payload;
            // goi api lay du lieu tu location id
            console.log(locationId);

            const image = "/login-1.jpeg";
            const province = "Hà Nội";
            const location = "Chùa Một Cột";

            const newLocation = {
                img: image,
                location: location,
                province: province,
                cost: cost,
            }

            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? [
                    ...date, newLocation
                ] : date)
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
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? [
                    ...date.slice(0, action.payload.indexLocation),
                    ...date.slice(action.payload.indexLocation + 1)
                ] : date)
            }
        }
        case TOUR_TYPES.RESET_TOUR: {
            return {
                ...state,
                tour: []
            }
        }
        default: {
            return state
        }
    }
}

export default tourReducer;

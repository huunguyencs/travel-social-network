import * as TOUR_TYPES from '../constants/tourConstant';

const INIT_STATE = {
    tours: [],
    loading: false,
    error: null,
}

const tourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.GET_TOURS: {
            return {
                ...state,
                tours: action.payload.tour,
                loading: false,
                error: null,
            }
        }
        case TOUR_TYPES.CREATE_TOUR: {
            return {
                ...state,
                tour: [
                    action.payload.tour,
                    ...state.tour,
                ],
                error: null
            }
        }
        case TOUR_TYPES.DELETE_TOUR: {
            return {
                ...state,
                tour: state.tour.filter(tour => tour.id !== action.payload.id),
                error: null,
            }
        }
        case TOUR_TYPES.LOADING: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case TOUR_TYPES.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }
        case TOUR_TYPES.UPDATE_LIKE: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.id ? {
                    ...item,
                    likes: action.payload.likes,
                } : item)
            }
        }
        case TOUR_TYPES.UPDATE_JOIN: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.id ? {
                    ...item,
                    tourIds: action.payload.tourIds
                } : item)
            }
        }
        case TOUR_TYPES.ADD_COMMENT: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.id ? {
                    ...item,
                    comments: [...item.comments, action.payload.comment]
                } : item)
            }
        }
        case TOUR_TYPES.UPDATE_COMMENT: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.tourId ? {
                    ...item,
                    comments: item.comments.map(comment => comment._id === action.payload.id ? action.payload.comment : comment)
                } : item)
            }
        }
        default: {
            return state
        }
    }
}

export default tourReducer;
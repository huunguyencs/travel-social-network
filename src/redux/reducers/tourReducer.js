import * as TOUR_TYPES from '../constants/tourConstant';

const INIT_STATE = {
    tours: [],
    loading: false,
    error: null,
    page: 1
}

const tourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.GET_TOURS: {
            return {
                ...state,
                tours: action.payload.tours,
                page: 1,
                loading: false,
                error: null,
            }
        }
        case TOUR_TYPES.ADD_TOUR: {
            return {
                ...state,
                tours: [...state.tours, action.payload.tour],
                loading: false,
                error: null
            }
        }

        case TOUR_TYPES.GET_MORE_TOUR: {
            return {
                ...state,
                tours: [...state.tours, ...action.payload.tours],
                page: state.page + 1,
                loading: false,
                error: null
            }
        }
        case TOUR_TYPES.LOADING_TOUR: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case TOUR_TYPES.DELETE_TOUR: {
            return {
                ...state,
                error: null,
                tours: state.tours.filter(tour => tour._id !== action.payload.id)
            }
        }
        case TOUR_TYPES.UPDATE_TOUR: {
            return {
                ...state,
                error: null,
                tours: state.tours.map(tour => tour._id === action.payload.tour._id ?
                    action.payload.tour
                    : tour)
            }
        }
        case TOUR_TYPES.UPDATE_LIKE_TOUR: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.id ? {
                    ...item,
                    likes: action.payload.likes
                } : item)
            }
        }
        case TOUR_TYPES.ADD_COMMENT_TOUR: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.id ? {
                    ...item,
                    comments: [...item.comments, action.payload.comment]
                } : item)
            }
        }
        case TOUR_TYPES.UPDATE_COMMENT_TOUR: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.tourId ? {
                    ...item,
                    comments: item.comments.map(comment => comment._id === action.payload.id ? action.payload.comment : comment)
                } : item)
            }
        }
        case TOUR_TYPES.DELETE_COMMENT_TOUR: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.tourId ? {
                    ...item,
                    comments: item.comments.filter(comment => comment._id !== action.payload.id)
                } : item)
            }
        }
        case TOUR_TYPES.ERROR_TOUR: {
            return {
                ...state,
                loading: false,
                tours: [],
                page: 0,
                error: action.payload.error,
            }
        }
        default: {
            return state;
        }
    }
}

export default tourReducer;
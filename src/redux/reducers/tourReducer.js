import * as TOUR_TYPES from '../constants/tourConstant';

const INIT_STATE = {
    tours: [],
    page: 2,
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

        case TOUR_TYPES.ADD_TOUR: {
            return {
                ...state,
                tours: [
                    action.payload.tour,
                    ...state.tour,
                ],
                error: null
            }
        }

        case TOUR_TYPES.UPDATE_TOUR: {
            return {
                ...state,
                tours: state.tours.map(tour => tour._id === action.payload.id ? action.payload.tour : tour)
            }
        }

        case TOUR_TYPES.DELETE_TOUR: {
            return {
                ...state,
                tours: state.tours.filter(tour => tour._id !== action.payload.id),
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
                tours: [],
                page: 2,
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
                    joinIds: action.payload.joinIds
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
        case TOUR_TYPES.DELETE_COMMENT: {
            return {
                ...state,
                tours: state.tours.map(item => item._id === action.payload.tourId ? {
                    ...item,
                    comments: item.comments.filter(comment => comment._id !== action.payload.id)
                } : item)
            }
        }
        default: {
            return state
        }
    }
}

export default tourReducer;
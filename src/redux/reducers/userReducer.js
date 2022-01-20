import * as USER_TYPES from '../constants/userConstant';

const INIT_STATE = {
    user: null,
    services: []
}

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_TYPES.GET_USER_INFO: {
            return {
                ...state,
                user: action.payload.user,
                // services: []
            }
        }
        case USER_TYPES.UPDATE_FOLLOW: {
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: action.payload.followers
                }
            }
        }
        case USER_TYPES.GET_SERVICES: {
            return {
                ...state,
                services: action.payload.services
            }
        }
        case USER_TYPES.GET_RATE: {
            return {
                ...state,
                services: state.services.map(item => item._id === action.payload.id ? {
                    ...item,
                    rate: action.payload.rate
                } : item)
            }
        }
        case USER_TYPES.REVIEW_SERVICE: {
            return {
                ...state,
                services: state.services.map(item => item._id === action.payload.id ? {
                    ...item,
                    rate: [...item.rate, action.payload.review],
                    star: action.payload.star
                } : item)
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer;
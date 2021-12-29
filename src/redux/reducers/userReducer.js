import * as USER_TYPES from '../constants/userConstant';

const INIT_STATE = {
    user: null
}

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_TYPES.GET_USER_INFO: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case USER_TYPES.FOLLOW: {
            if (action.payload.user._id === state.user?._id) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: [...state.user.followers, action.payload.user]
                }
            }
        }
        case USER_TYPES.UNFOLLOW: {
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: state.user.followers.filter(item => item._id !== action.payload.user)
                }
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer;
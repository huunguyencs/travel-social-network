import * as AUTH_TYPES from '../constants/authConstant';

const INIT_STATE = {
    user: null,
    token: null,
}

const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTH_TYPES.AUTH: {  // luu thong tin nguoi dung khi dang nhap
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            }
        }
        case AUTH_TYPES.LOGOUT: {
            return INIT_STATE
        }
        case AUTH_TYPES.FOLLOW: {
            console.log(action.payload.user);
            if (action.payload.user._id === state.user._id) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload.user]
                }
            }
        }
        case AUTH_TYPES.UNFOLLOW: {
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(item => item._id !== action.payload.user)
                }
            }
        }
        default: {
            return state
        }

    }
}

export default authReducer;
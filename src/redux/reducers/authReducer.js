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
        case AUTH_TYPES.UPDATE_FOLLOWING: {
            // console.log(action.payload.followings)
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: action.payload.followings
                }
            }
        }
        case AUTH_TYPES.UPDATE_INFO: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case AUTH_TYPES.CHANGE_BG: {
            return {
                ...state,
                user: {
                    ...state.user,
                    background: action.payload.background
                }
            }
        }
        case AUTH_TYPES.CHANGE_AVATAR: {
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.payload.avatar
                }
            }
        }
        default: {
            return state
        }

    }
}

export default authReducer;
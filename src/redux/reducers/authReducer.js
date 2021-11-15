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
        default: {
            return state
        }

    }
}

export default authReducer;
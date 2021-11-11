import * as AUTH_TYPES from '../constants/authConstant';

const INIT_STATE = {
    user: null,
}

const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TYPES.AUTH: {
            return {
                ...state,
                user: action.payload.user,
            }
        }
        default: {
            return state
        }

    }
}

export default authReducer;
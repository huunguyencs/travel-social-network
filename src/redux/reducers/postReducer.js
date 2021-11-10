import * as POST_TYPES from '../constants/postConstant';

const INIT_STATE = {
    isFetching: false,
    error: null,
}

const postReducer = (state, action) => {
    switch (action.type) {
        case POST_TYPES.SAVE_POST_START: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case POST_TYPES.SAVE_POST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
            }
        }
        case POST_TYPES.SAVE_POST_FAIL: {
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
            }
        }
        default: {
            return state
        }
    }
}


export default postReducer;
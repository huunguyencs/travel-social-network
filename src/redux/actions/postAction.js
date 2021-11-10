import * as POST_TYPES from '../constants/postConstant';

export const savePostStart = (props) => {
    return {
        type: POST_TYPES.SAVE_POST_START,
    }
}

export const savePostSuccess = (props) => {
    return {
        type: POST_TYPES.SAVE_POST_SUCCESS,
    }
}

export const savePostFail = (props) => {
    return {
        type: POST_TYPES.SAVE_POST_FAIL,
    }
}
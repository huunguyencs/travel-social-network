import * as POST_TYPES from '../constants/postConstant';

export const createPost = (props) => {
    return {
        type: POST_TYPES.CREATE_POST,
        payload: props,
    }
}

export const getPosts = (props) => {
    return {
        type: POST_TYPES.GET_POSTS,
        payload: props,
    }
}

export const updatePost = (props) => {
    return {
        type: POST_TYPES.UPDATE_POST,
        payload: props,
    }
}

export const deletePost = (props) => {
    return {
        type: POST_TYPES.DELETE_POST,
        payload: props,
    }
}

export const loading = (props) => {
    return {
        type: POST_TYPES.LOADING,
        payload: props,
    }
}

export const error = (props) => {
    return {
        type: POST_TYPES.ERROR,
        payload: props,
    }
}
import * as POST_TYPES from '../constants/postConstant';

const INIT_STATE = {
    posts: [],
    loading: false,
    error: null,
}

const postRecuder = (state = INIT_STATE, action) => {
    switch (action.type) {
        case POST_TYPES.GET_POSTS: {
            return {
                ...state,
                posts: action.payload.posts,
                loading: false,
                error: null,
            }
        }
        case POST_TYPES.LOADING: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case POST_TYPES.DELETE_POST: {
            return {
                ...state,
                error: null,
                posts: state.posts.filter(post => post.id !== action.payload.id)
            }
        }
        case POST_TYPES.UPDATE_POST: {
            return {
                ...state,
                error: null,
                posts: state.posts.map(post => post.id === action.payload.post.id ?
                    action.payload.post
                    : post)
            }
        }
        case POST_TYPES.CREATE_POST: {
            return {
                ...state,
                error: null,
                post: [
                    action.payload.post,
                    ...state.post,
                ]
            }
        }
        case POST_TYPES.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }
        default: {
            return state
        }
    }
}

export default postRecuder;
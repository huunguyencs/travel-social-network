import * as POST_TYPES from '../constants/postConstant';

const INIT_STATE = {
    posts: [],
    page: 2,
    scrollTop: false,
    loading: false,
    error: null,
}

const postRecuder = (state = INIT_STATE, action) => {
    switch (action.type) {
        case POST_TYPES.GET_POSTS: {  // tai danh sach cac post (thanh cong)
            return {
                ...state,
                posts: action.payload.posts,
                page: 2,
                loading: false,
                error: null,
            }
        }
        case POST_TYPES.ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, action.payload.post],
                loading: false,
                error: null,
            }
        }
        case POST_TYPES.GET_MORE_POSTS: {
            return {
                ...state,
                posts: [...state.posts, action.payload.posts],
                page: state.page + 1,
                loading: false,
                error: null,
            }
        }
        case POST_TYPES.LOADING: { // dang tai danh sach
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
                posts: state.posts.filter(post => post._id !== action.payload._id)
            }
        }
        case POST_TYPES.UPDATE_POST: {
            return {
                ...state,
                error: null,
                posts: state.posts.map(post => post._id === action.payload.post._id ?
                    action.payload.post
                    : post)
            }
        }
        case POST_TYPES.UPDATE_LIKE: {
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.id ? {
                    ...item,
                    likes: action.payload.likes
                } : item)
            }
        }
        case POST_TYPES.ADD_COMMENT: {
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.id ? {
                    ...item,
                    comments: [...item.comments, action.payload.comment]
                } : item)
            }
        }
        case POST_TYPES.UPDATE_COMMENT: {

            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.postId ? {
                    ...item,
                    comments: item.comments.map(comment => comment._id === action.payload.id ? action.payload.comment : comment)
                } : item)
            }
        }
        case POST_TYPES.DELETE_COMMENT: {
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.postId ? {
                    ...item,
                    comments: item.comments.filter(comment => comment._id === action.payload.id)
                } : item)
            }
        }
        case POST_TYPES.ERROR: { // loi trong khi tai danh sach cac post
            return {
                ...state,
                loading: false,
                posts: [],
                page: 2,
                error: action.payload.error,
            }
        }
        default: {
            return state
        }
    }
}

export default postRecuder;
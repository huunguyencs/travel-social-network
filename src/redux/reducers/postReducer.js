import * as POST_TYPES from '../constants/postConstant';

const INIT_STATE = {
    posts: [],
    page: 1,
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
                page: 1,
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
                posts: [...state.posts, ...action.payload.posts],
                page: state.page + 1,
                loading: false,
                error: null,
            }
        }
        case POST_TYPES.LOADING_POST: { // dang tai danh sach
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
                posts: state.posts.filter(post => post._id !== action.payload.id)
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
        case POST_TYPES.UPDATE_LIKE_POST: {
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.id ? {
                    ...item,
                    likes: action.payload.likes
                } : item)
            }
        }
        case POST_TYPES.LOAD_COMMENT_POST: {
            let comment = state.posts.find(item => item._id === action.payload.id)?.commentDetail || [];
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.id ? {
                    ...item,
                    commentDetail: [...comment, ...action.payload.comments]
                } : item)
            }
        }
        case POST_TYPES.ADD_COMMENT_POST: {
            let comment = state.posts.find(item => item._id === action.payload.id)?.commentDetail || [];
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.id ? {
                    ...item,
                    commentDetail: [...comment, action.payload.comment],
                    comments: [...item.comments, action.payload.comment._id]
                } : item)
            }
        }
        case POST_TYPES.UPDATE_COMMENT_POST: {
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.postId ? {
                    ...item,
                    commentDetail: item.commentDetail.map(comment => comment._id === action.payload.comment._id ? action.payload.comment : comment)
                } : item)
            }
        }
        case POST_TYPES.DELETE_COMMENT_POST: {
            return {
                ...state,
                posts: state.posts.map(item => item._id === action.payload.postId ? {
                    ...item,
                    commentDetail: item.commentDetail.filter(comment => comment._id !== action.payload.id),
                    comments: item.comments.filter(comment => comment !== action.payload.id)
                } : item)
            }
        }
        case POST_TYPES.ERROR_POST: { // loi trong khi tai danh sach cac post
            return {
                ...state,
                loading: false,
                posts: [],
                page: 0,
                error: action.payload.error,
            }
        }
        default: {
            return state
        }
    }
}

export default postRecuder;
import * as notifyAction from '../actions/notifyAction'
import * as postAction from '../actions/postAction';


export const getPosts = (data) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        // call api to get post list
        const res;

        dispatch(postAction.getPosts({ post: res.data }))
    }
    catch (err) {
        dispatch(postAction.error({ error: err }))
    }

}

export const createPost = (data) => async (dispatch) => {
    // post api
    dispatch(notifyAction.callStart());
    try {
        // call api to save post

        dispatch(notifyAction.callSuccess());


    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const updatePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // call api to update post

        dispatch(notifyAction.callSuccess());

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const deletePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {


        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const likePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res;
        dispatch(postAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const unlikePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res;
        dispatch(postAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}
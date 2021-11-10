import * as notifyAction from '../actions/notifyAction'

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
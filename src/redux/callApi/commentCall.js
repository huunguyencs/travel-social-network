import * as notifyAction from '../actions/notifyAction';
import * as commentAction from '../actions/commentAction';

export const getCommentPost = (data) => async (dispatch) => {

}

export const getCommentTour = (data) => async (dispatch) => {

}

export const createCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;

    dispatch(commentAction.updateCommentPost({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const createCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;

    dispatch(commentAction.updateCommentTour({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const updateCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;

    dispatch(commentAction.updateCommentPost({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const updateCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;

    dispatch(commentAction.updateCommentTour({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const deleteCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;

    dispatch(commentAction.updateCommentPost({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const deleteCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;

    dispatch(commentAction.updateCommentTour({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const likeCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;
    dispatch(commentAction.updateCommentPost({ comment: newComments }));
    try {
        // call api to update comment like
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const likeCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;
    dispatch(commentAction.updateCommentTour({ comment: newComments }));
    try {
        // call api to update comment like
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const unlikeCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;
    dispatch(commentAction.updateCommentPost({ comment: newComments }));
    try {
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const unlikeCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    const newComments;
    dispatch(commentAction.updateCommentTour({ comment: newComments }));
    try {
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}
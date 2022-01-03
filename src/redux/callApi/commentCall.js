import * as notifyAction from '../actions/notifyAction';
import * as commentAction from '../actions/commentAction';
import customAxios from '../../utils/fetchData';

export const getCommentPost = (data) => async (dispatch) => {

}

export const getCommentTour = (data) => async (dispatch) => {

}

export const createCommentPost = (id, comment, auth,socket, next) => async (dispatch) => {

    try {
        // call api to update comment
        const res = await customAxios(auth.token).post("/comment/create_comment", {
            commentType: "post",
            content: comment,
            postId: id,
        })

        const newComment = {
            ...res.data.newComment,
            userId: auth.user,
        }

        next(newComment);
        dispatch(commentAction.addCommentPost({ id: id, comment: newComment }))

        socket.emit('createCommentPost',{ id: id, comment: newComment} );

    }
    catch (err) {
        // console.log(err.response.data.message);

    }
}

export const createCommentTour = (id, comment, auth, next) => async (dispatch) => {

    try {
        // call api to update comment
        const res = await customAxios(auth.token).post("/comment/create_comment", {
            commentType: "tour",
            content: comment,
            tourId: id,
        })

        const newComment = {
            ...res.data.newComment,
            userId: auth.user,
        }
        next(newComment);
        dispatch(commentAction.addCommentTour({ id: id, comment: newComment }))
    }
    catch (err) {
        console.log(err);
    }
}

export const updateCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    // const newComments;

    // dispatch(commentAction.updateCommentPost({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const updateCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    // const newComments;

    // dispatch(commentAction.updateCommentTour({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const deleteCommentPost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    // const newComments;

    // dispatch(commentAction.updateCommentPost({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const deleteCommentTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    // const newComments;

    // dispatch(commentAction.updateCommentTour({ comments: newComments }))
    try {
        // call api to update comment
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const likeComment = (id, auth, type, postId) => async (dispatch) => {

    try {
        // call api to update comment like
        const res = await customAxios(auth.token).patch(`/comment/${id}/like`);

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, postId: postId }))
        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentTour({ comment: res.data.newComment, id: id, tourId: postId }))
        }
    }
    catch (err) {
        console.log(err.response.data.message);
    }
}


export const unlikeComment = (id, auth, type, postId) => async (dispatch) => {

    try {
        const res = await customAxios(auth.token).patch(`/comment/${id}/unlike`);

        // const newComment = {
        //     ...res.data.newComment,
        //     userId: auth.user,
        // }

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, postId: postId }))
        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, tourId: postId }))
        }
    }
    catch (err) {
        console.log(err.response.data.message);
    }
}

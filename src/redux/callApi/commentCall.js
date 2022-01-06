
import * as commentAction from '../actions/commentAction';
import customAxios from '../../utils/fetchData';



export const createComment = (id, comment, auth, type, next) => async (dispatch) => {

    try {
        // call api to update comment

        const res = await customAxios(auth.token).post("/comment/create_comment", {
            commentType: type,
            content: comment,
            postId: id,
            tourId: id,
        })

        const newComment = {
            ...res.data.newComment,
            userId: auth.user,
        }

        next(newComment);
        if (type === "post") {
            dispatch(commentAction.addCommentPost({ id: id, comment: newComment }))
        }
        else if (type === "tour") {
            dispatch(commentAction.addCommentTour({ id: id, comment: newComment }));
        }


    }
    catch (err) {
        // console.log(err.response.data.message);

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

export const deleteComment = (id, auth, type, postId) => async (dispatch) => {
    try {
        await customAxios(auth.token).delete(`/comment/${id}`);
        if (type === "post") {
            dispatch(commentAction.deleteCommentPost({ id: id, postId: postId }))
        }
        else if (type === "tour") {
            dispatch(commentAction.deleteCommentTour({ id: id, tourId: postId }))
        }
    }
    catch (err) {

    }
}

import * as commentAction from '../actions/commentAction';
import customAxios from '../../utils/fetchData';
import { createNotify, deleteNotify } from './notifyCall';
import * as alertAction from '../actions/alertAction';


export const createComment = (id, comment, auth, type, socket, next) => async (dispatch) => {

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
        dispatch(commentAction.addCommentPost({ id: id, comment: newComment }))

        socket.emit('createComment', { type: type, id: id, comment: newComment });

        //lấy thông tin  post
        const resPost = await customAxios(auth.token).get(`/post/${id}`)
        // Notify
        const dataNotify = {
            id: res.data.newComment._id,
            text: ' đã bình luận vào bài viết của bạn',
            recipients: [resPost.data.post.userId._id],
            url: `/post/${id}`,
            content: resPost.data.post.content,
            image: resPost.data.post.images.length > 0 ? resPost.data.post.images[0] : "empty"
        }

        dispatch(createNotify(dataNotify, auth.token, socket))
    }
    catch (err) {
        // console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));

    }
}

// export const createCommentTour = (id, comment, auth, socket, next) => async (dispatch) => {

//     try {
//         // call api to update comment
//         const res = await customAxios(auth.token).post("/comment/create_comment", {
//             commentType: "tour",
//             content: comment,
//             tourId: id,
//         })

//         const newComment = {
//             ...res.data.newComment,
//             userId: auth.user,
//         }
//         next(newComment);
//         dispatch(commentAction.addCommentTour({ id: id, comment: newComment }))

//         socket.emit('createComment', { type: 'tour', id: id, comment: newComment });
//     }
//     catch (err) {
//         // console.log(err);
//         if (err.response && err.response.data && err.response.data.message)
//             dispatch(alertAction.error({ message: err.response.data.message }))
//         else
//             dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
//     }
// }

export const updateCommentPost = (data) => async (dispatch) => {

    // const newComments;

    // dispatch(commentAction.updateCommentPost({ comments: newComments }))
    try {
        // call api to update comment

    }
    catch (err) {

    }
}




export const likeComment = (id, auth, type, postId, socket) => async (dispatch) => {

    try {
        // call api to update comment like
        const res = await customAxios(auth.token).patch(`/comment/${id}/like`);

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, postId: postId }))

            socket.emit('like', { type: 'commentPost', comment: res.data.newComment, id: id, postId: postId })
        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentTour({ comment: res.data.newComment, id: id, tourId: postId }))

            socket.emit('like', { type: 'commentTour', comment: res.data.newComment, id: id, tourId: postId })
        }
    }
    catch (err) {
        // console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));

    }
}


export const unlikeComment = (id, auth, type, postId, socket) => async (dispatch) => {

    try {
        const res = await customAxios(auth.token).patch(`/comment/${id}/unlike`);

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, postId: postId }))

            socket.emit('unlike', { type: 'commentPost', comment: res.data.newComment, id: id, postId: postId })

        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, tourId: postId }))

            socket.emit('unlike', { type: 'commentTour', comment: res.data.newComment, id: id, tourId: postId })
        }
    }
    catch (err) {
        // console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const deleteComment = (id, auth, type, postId, socket) => async (dispatch) => {
    try {
        await customAxios(auth.token).delete(`/comment/${id}`);
        if (type === "post") {
            dispatch(commentAction.deleteCommentPost({ id: id, postId: postId }))

            //lấy thông tin  post
            const resPost = await customAxios(auth.token).get(`/post/${id}`);
            // Notify
            const dataNotify = {
                id: id,
                url: `/post/${resPost.data.post._id}`,
            }
            dispatch(deleteNotify(dataNotify, auth.token, socket));
        }
        else if (type === "tour") {
            dispatch(commentAction.deleteCommentTour({ id: id, tourId: postId }))
        }
    }
    catch (err) {

    }
}
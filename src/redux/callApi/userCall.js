import customAxios from '../../utils/fetchData';
import * as authAction from '../actions/authAction';
import * as userAction from '../actions/userAction';
import * as alertAction from '../actions/alertAction';

export const getUser = (id, callback) => async (dispatch) => {
    try {

        const res = await customAxios().get(`/user/${id}`);

        dispatch(userAction.getUserInfo({ user: res.data.user }))

        // console.log(res)

        if (res.data.user.role === 1) {
            const res = await customAxios().get(`/service/get_by_coop/${id}`);
            dispatch(userAction.getServices({ services: res.data.services }))
        }
    }
    catch (err) {
        if (err.response && err.response?.status === 404)
            callback();
        else {
            if (err.response && err.response.data && err.response.data.message)
                dispatch(alertAction.error({ message: err.response.data.message }))
            else
                dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
        }
    }
}


export const follow = (follow, token, socket, next) => async (dispatch) => {
    try {
        // A follow B(follow.id)
        await customAxios(token).put(`/user/${follow._id}/follow`).then(res => {
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            socket.emit('follow', { id: follow._id, followers: res.data.followers, followings: res.data.followings })
        });
    }
    catch (err) {
        next();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const unfollow = (follow, token, socket, next) => async (dispatch) => {
    try {
        // A unfollow B(follow.id)
        await customAxios(token).put(`/user/${follow._id}/unfollow`).then(res => {
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            socket.emit('unfollow', { id: follow._id, followers: res.data.followers, followings: res.data.followings })

        });
    }
    catch (err) {
        next();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}


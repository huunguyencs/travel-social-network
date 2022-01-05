import customAxios from '../../utils/fetchData';
import * as authAction from '../actions/authAction';
import * as userAction from '../actions/userAction';

export const getUser = (id, user, callback) => async (dispatch) => {
    try {
        if (id === user._id) {
            dispatch(userAction.getUserInfo({ user: user }))
        }
        else {
            await customAxios().get(`/user/${id}`).then(res => {
                dispatch(userAction.getUserInfo({ user: res.data.user })
                )
            }).catch(err => {
                console.log(err.response.status);
                if (err.response.status === 404)
                    callback();
            });
        }
    }
    catch (err) {
        // console.log(err.response.data.message);

    }
}


export const follow = (follow, token,socket, next) => async (dispatch) => {
    try {
        // A follow B(follow.id)
        await customAxios(token).put(`/user/${follow._id}/follow`).then(res => {
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            socket.emit('follow',{id: follow._id, followers: res.data.followers, followings: res.data.followings})
        });
    }
    catch (err) {
        next();
    }
}

export const unfollow = (follow, token,socket, next) => async (dispatch) => {
    try {
        // A unfollow B(follow.id)
        await customAxios(token).put(`/user/${follow._id}/unfollow`).then(res => {
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            socket.emit('unfollow',{id: follow._id, followers: res.data.followers, followings: res.data.followings})

        });
    }
    catch (err) {
        next();
    }
}
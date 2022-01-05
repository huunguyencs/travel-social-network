import * as notifyAction from '../actions/notifyAction';
import * as authAction from '../actions/authAction';
import * as userAction from '../actions/userAction';
import customAxios from '../../utils/fetchData';


export const login = (data, callback) => async (dispatch) => {

    // begin loading
    dispatch(notifyAction.callStart());
    try {
        // call api to login
        const res = await customAxios().post("user/login", data, {
            credentials: "include",
        });


        // stop loading
        dispatch(notifyAction.callSuccess({ message: "" }));
        // console.log(res);
        dispatch(authAction.auth({ user: res.data.user, token: res.data.accessToken }));

    }
    catch (err) {
        // console.log(err);
        callback(err.response.data.message);
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const register = (data, callback) => async (dispatch) => {

    dispatch(notifyAction.callStart());
    try {
        // call api to register
        const res = await customAxios().post("user/register", data);

        // console.log(res);

        // stop loading
        dispatch(notifyAction.callSuccess({ message: res.data.message }));
    }
    catch (err) {
        // console.log(err);
        callback(err.response.data.message);
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const refreshToken = (callback) => async (dispatch) => {
    try {
        const res = await customAxios().post("/user/refresh_token", {}, {
            // withCredentials: true,
            credentials: 'include'
        });
        // console.log(res);
        dispatch(authAction.auth({ user: res.data.user, token: res.data.accessToken }));
    }
    catch (err) {
        // console.log(err.response.data.message);
        callback();
        // dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const logout = (data) => async (dispatch) => {
    try {
        await customAxios().post("/user/logout", data)
        // console.log(res);
        dispatch(authAction.logout());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const follow = (token, userId,socket, next) => async (dispatch) => {
    try {
        await customAxios(token).put(`/user/${userId}/follow`).then(res => {
            console.log(res.data);
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            socket.emit('follow',{id: userId, followers: res.data.followers, followings: res.data.followings})
        })
    }
    catch (err) {
        next();
    }
}

export const unfollow = (token, userId,socket, next) => async (dispatch) => {
    try {
        await customAxios(token).put(`/user/${userId}/unfollow`).then(res => {
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            socket.emit('unfollow',{id: userId, followers: res.data.followers, followings: res.data.followings})
        })
    }
    catch (err) {
        next();
    }
}
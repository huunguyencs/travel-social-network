import * as authAction from '../actions/authAction';
import * as userAction from '../actions/userAction';
import customAxios from '../../utils/fetchData';
import * as alertAction from '../actions/alertAction';


export const login = (data, next, callback) => async (dispatch) => {

    // begin loading
    // dispatch(notifyAction.callStart());
    try {
        // call api to login
        const res = await customAxios().post("user/login", data, {
            credentials: "include",

        });


        dispatch(authAction.auth({ user: res.data.user, token: res.data.accessToken }));
        localStorage.setItem("login", true);
        next();
    }
    catch (err) {
        // console.log(err);
        if (err.response && err.response.data && err.response.data.message)
            callback(err.response.data.message);
        else callback("Lỗi không rõ")
        // dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const register = (data, next, callback) => async (dispatch) => {

    try {
        // call api to register
        await customAxios().post("user/register", data);

        // console.log(res);
        next();
        // stop loading
        // dispatch(alertAction.callSuccess({ message: res.data.message }));
    }
    catch (err) {
        // console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
            callback(err.response.data.message);
        }
        else callback("Lỗi không rõ")
        // dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const refreshToken = (token) => async (dispatch) => {
    const login = localStorage.getItem("login");
    if (login && !token) {
        try {
            // console.log("refresh");
            const res = await customAxios().post("/user/refresh_token", {}, {
                // withCredentials: true,
                credentials: 'include',
                timeout: 30 * 1000
            });
            // console.log(res);
            dispatch(authAction.auth({ user: res.data.user, token: res.data.accessToken }));
        }
        catch (err) {
            // console.log(err.response.data.message);
            // callback();
            // dispatch(notifyAction.callFail({ error: err.response.data.message }));
        }
    }
    else return;

}

export const logout = (data) => async (dispatch) => {
    try {
        await customAxios().post("/user/logout", data)
        localStorage.removeItem("login")
        // console.log(res);
        dispatch(authAction.logout());
    }
    catch (err) {
        // dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const follow = (token, userId, socket, next) => async (dispatch) => {
    try {
        await customAxios(token).put(`/user/${userId}/follow`).then(res => {
            // console.log(res.data);
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            socket.emit('follow', { id: userId, followers: res.data.followers, followings: res.data.followings })
        })
    }
    catch (err) {
        next();
    }
}

export const unfollow = (token, userId, socket, next) => async (dispatch) => {
    try {
        await customAxios(token).put(`/user/${userId}/unfollow`).then(res => {
            dispatch(authAction.updateFollowing({ followings: res.data.followings }))
            dispatch(userAction.updateFollower({ followers: res.data.followers }))
            socket.emit('unfollow', { id: userId, followers: res.data.followers, followings: res.data.followings })
        })
    }
    catch (err) {
        next();
    }
}

export const changePassword = (token, data, next, error) => async (dispatch) => {
    try {
        await customAxios(token).patch('/user/change_password', data);
        dispatch(alertAction.success({ message: "Cập nhật mật khẩu thành công" }))
        next();
    }
    catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            error(err.response.data.message);
        }
        else error("Có lỗi xảy ra")
    }
}
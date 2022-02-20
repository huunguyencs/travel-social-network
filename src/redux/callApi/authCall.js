import * as authAction from '../actions/authAction';
import * as userAction from '../actions/userAction';
import customAxios from '../../utils/fetchData';
import * as alertAction from '../actions/alertAction';
import * as imageUtils from '../../utils/uploadImage';


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

        dispatch(alertAction.success({ message: "Đăng ký tài khoản thành công!" }))
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
        dispatch(alertAction.success({ message: "Cập nhật mật khẩu thành công!" }))
        next();
    }
    catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            error(err.response.data.message);
        }
        else error("Có lỗi xảy ra")
    }
}

export const changeInfo = (token, data, next, error) => async (dispatch) => {
    try {
        const res = await customAxios(token).patch('/user/change_info', data);
        dispatch(alertAction.success({ message: "Cập nhật thông tin thành công!" }));
        dispatch(authAction.updateInfo({ user: res.data.newUser }))
        next();
    }
    catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            error(err.response.data.message);
        }
        else error("Có lỗi xảy ra")
    }
}

export const confirmAccount = (token, data, next) => async (dispatch) => {
    try {

        await customAxios(token).post('/user/confirm_account', data);
        dispatch(alertAction.success({ message: "Đã gửi thông tin thành công!" }));
        // dispatch(authAction.updateInfo({ user: res.data.newUser }))
        next();
    }
    catch (err) {
        console.log("err", err)
    }
}

export const changeBackground = (token, src, next, error) => async (dispatch) => {
    try {
        const image = await imageUtils.uploadImages([src]);
        if (image?.length > 0) {
            const url = image[0];
            await customAxios(token).patch('/user/change_background', {
                background: url
            });

            dispatch(authAction.changeBackground({ background: url }));
            next();
            dispatch(alertAction.success({ message: "Cập nhật ảnh bìa thành công!" }));
        }
        else {
            error("Có lỗi xảy ra")
        }
    }
    catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            error(err.response.data.message);
        }
        else error("Có lỗi xảy ra")
    }
}

export const changeAvatar = (token, src, next, error) => async (dispatch) => {
    try {
        const image = await imageUtils.uploadImages([src]);
        if (image?.length > 0) {
            const url = image[0];
            await customAxios(token).patch('/user/change_avatar', {
                avatar: url
            });

            dispatch(authAction.changeAvatar({ avatar: url }));
            next();
            dispatch(alertAction.success({ message: "Cập nhật ảnh đại diện thành công!" }));
        }
        else {
            error("Có lỗi xảy ra")
        }
    }
    catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            error(err.response.data.message);
        }
        else error("Có lỗi xảy ra")
    }
}

export const saveTour = (tourId, token) => async (dispatch) => {
    try {
        const res = await customAxios(token).put('/user/save_tour', {
            tour: tourId
        })

        dispatch(authAction.saveTour({ tourSaved: res.data.tourSaved }))
        dispatch(alertAction.success({ message: "Lưu hành trình thành công" }))
    }
    catch (err) {
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}

export const unsavedTour = (tourId, token) => async (dispatch) => {
    try {
        const res = await customAxios(token).put('/user/unsave_tour', {
            tour: tourId
        })
        dispatch(authAction.saveTour({ tourSaved: res.data.tourSaved }))
        dispatch(alertAction.success({ message: "Đã loại khỏi danh sách lưu" }))
    }
    catch (err) {
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}

export const getFriendRecommend = (token, limit) => async (dispatch) => {
    try {
        const res = await customAxios(token).get(`/user/get_friend_recommend?limit=${limit}`);
        dispatch(authAction.getFriendRecommend({ friendsRecommend: res.data.recommend }))
    }
    catch (err) {
        console.log(err);
    }
}
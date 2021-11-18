import * as notifyAction from '../actions/notifyAction';
import * as authAction from '../actions/authAction';
import request from '../../utils/fetchData';

export const login = (data) => async (dispatch) => {

    // begin loading
    dispatch(notifyAction.callStart());
    try {
        // call api to login
        // const res = await request.post("login", data);

        const res = {
            user: {
                firstName: "Hữu",
                lastName: "Nguyễn",
                avatarImage: "https://www.w3schools.com/howto/img_avatar.png"
            },
            token: "adaskjdhasdhjkasdh",
        };

        // stop loading
        dispatch(notifyAction.callSuccess());
        dispatch(authAction.auth({ user: res.user, token: res.token }));

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const register = (data) => async (dispatch) => {

    dispatch(notifyAction.callStart());
    try {
        // call api to login
        const res = await request.post("user/register", data, {
            "Content-Type": "application/json",
        });

        console.log(res);

        // stop loading
        dispatch(notifyAction.callSuccess({ message: res.data.message }));

        // redirect

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const logout = (data) => async (dispatch) => {
    document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(authAction.logout());
}
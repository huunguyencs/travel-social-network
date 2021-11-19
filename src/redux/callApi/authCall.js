import * as notifyAction from '../actions/notifyAction';
import * as authAction from '../actions/authAction';
import customAxios from '../../utils/fetchData';


export const login = (data) => async (dispatch) => {

    // begin loading
    dispatch(notifyAction.callStart());
    try {
        // call api to login
        const res = await customAxios().post("user/login", data);


        // stop loading
        dispatch(notifyAction.callSuccess({ message: "" }));
        console.log(res);
        dispatch(authAction.auth({ user: res.data.user, token: res.data.accessToken }));

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const register = (data) => async (dispatch) => {

    dispatch(notifyAction.callStart());
    try {
        // call api to register
        const res = await customAxios().post("user/register", data);

        console.log(res);

        // stop loading
        dispatch(notifyAction.callSuccess({ message: res.data.message }));
    }
    catch (err) {
        console.log(err);
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const logout = (data) => async (dispatch) => {
    document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(authAction.logout());
}
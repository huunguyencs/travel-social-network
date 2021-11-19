import * as notifyAction from '../actions/notifyAction';
import * as authAction from '../actions/authAction';
import client from '../../utils/fetchData';

const request = client("");

export const login = (data) => async (dispatch) => {

    // begin loading
    dispatch(notifyAction.callStart());
    try {
        // call api to login
        const res = await request.post("user/login", data, {
            "Content-Type": "application/json",
        });

        // const res = {
        //     user: {
        //         firstName: "Hữu",
        //         lastName: "Nguyễn",
        //         avatarImage: "https://www.w3schools.com/howto/img_avatar.png"
        //     },
        //     token: "adaskjdhasdhjkasdh",
        // };

        // stop loading
        dispatch(notifyAction.callSuccess({ message: "" }));
        console.log(res);
        dispatch(authAction.auth({ user: res.data.user, token: res.data.accessToken }));

    }
    catch (err) {
        // console.log(err.response.data);
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
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


    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const logout = (data) => async (dispatch) => {
    document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(authAction.logout());
}
import * as notifyAction from '../actions/notifyAction';
import * as authAction from '../actions/authAction';

export const login = (data) => async (dispatch) => {

    // begin loading
    dispatch(notifyAction.callStart());
    try {
        // call api to login

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

export const signup = (data) => async (dispatch) => {

    dispatch(notifyAction.callStart());
    try {
        // call api to login

        const res = null;
        // stop loading
        dispatch(notifyAction.callSuccess());

        // redirect

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }

}

export const logout = (data) => async (dispatch) => {

}
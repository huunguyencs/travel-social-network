import * as notifyAction from '../actions/notifyAction';
import * as authAction from '../actions/authAction';

export const login = (data) => async (dispatch) => {

    // begin loading
    dispatch(notifyAction.callStart());
    try {
        // call api to login

        const res = null;
        // stop loading
        dispatch(notifyAction.callSuccess());
        dispatch(authAction.auth({ user: res.data.user }));

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
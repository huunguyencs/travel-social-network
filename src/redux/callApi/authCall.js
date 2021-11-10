import * as authAction from '../actions/authAction';

export const login = (props) => async (dispatch) => {

    // begin loading
    dispatch(authAction.loginStart());
    try {
        // call api to login

        const res = null;
        // stop loading
        dispatch(authAction.loginSuccess({ user: res.data.user }));

    }
    catch (err) {
        dispatch(authAction.loginFail({ error: err }));
    }


}

export const signup = (props) => async (dispatch) => {

    dispatch(authAction.signupStart());
    try {
        // call api to sign up

        const res = null;
        dispatch(authAction.signupSuccess());
    }
    catch (err) {
        dispatch(authAction.signupFail({ error: err }));
    }

}

export const logout = (props) => async (dispatch) => {

}
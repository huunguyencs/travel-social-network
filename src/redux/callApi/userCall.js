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


export const follow = (follow, token, user) => async (dispatch) => {
    try {
        dispatch(authAction.follow({
            user: {
                _id: follow._id,
                username: follow.username,
                avatar: follow.avatar,
                fullname: follow.fullname,
            }
        }))

        dispatch(userAction.follow({
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                fullname: user.fullname,
            }
        }))

        await customAxios(token).put(`/user/${follow._id}/follow`);
    }
    catch (err) {
        dispatch(authAction.unfollow({ user: follow._id }));
        dispatch(userAction.unfollow({ user: user._id }));
        // console.log(err.response.data.message);
    }
}

export const unfollow = (follow, token, user) => async (dispatch) => {
    try {
        dispatch(authAction.unfollow({ user: follow._id }));
        dispatch(userAction.unfollow({ user: user._id }));
        await customAxios(token).put(`/user/${follow._id}/unfollow`);
    }
    catch (err) {
        dispatch(authAction.follow({
            user: {
                _id: follow._id,
                username: follow.username,
                avatar: follow.avatar,
                fullname: follow.fullname,
            }
        }))

        dispatch(userAction.follow({
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                fullname: user.fullname,
            }
        }))
        // console.log(err.response.data.message);
    }
}
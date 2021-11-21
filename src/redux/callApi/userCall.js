import customAxios from '../../utils/fetchData';
import * as authAction from '../actions/authAction';


export const follow = (user, token) => async (dispatch) => {
    try {
        await customAxios(token).put(`/user/${user._id}/follow`);

        dispatch(authAction.follow({
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                fullname: user.fullname,
            }
        }))
    }
    catch (err) {
        console.log(err.response.data.message);
    }
}

export const unfollow = (user, token) => async (dispatch) => {
    try {
        await customAxios(token).put(`/user/${user._id}/unfollow`);

        dispatch(authAction.unfollow({ user: user._id }));
    }
    catch (err) {
        console.log(err.response.data.message);
    }
}
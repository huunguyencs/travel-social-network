import customAxios from '../../utils/fetchData';
import * as authAction from '../actions/authAction';

// export const getUser = (id, token, callback) => async () => {
//     try {
//         console.log("hi");
//         const res = await customAxios(token).get(`/user/${id}`);
//         console.log(res);
//         callback(res.data.user);
//     }
//     catch (err) {
//         console.log(err.response.data.message);
//     }
// }


export const follow = (user, token) => async (dispatch) => {
    try {
        dispatch(authAction.follow({
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                fullname: user.fullname,
            }
        }))

        await customAxios(token).put(`/user/${user._id}/follow`);
    }
    catch (err) {
        dispatch(authAction.unfollow({ user: user._id }));
        console.log(err.response.data.message);
    }
}

export const unfollow = (user, token) => async (dispatch) => {
    try {
        dispatch(authAction.unfollow({ user: user._id }));
        await customAxios(token).put(`/user/${user._id}/unfollow`);


    }
    catch (err) {
        dispatch(authAction.follow({
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                fullname: user.fullname,
            }
        }))
        console.log(err.response.data.message);
    }
}
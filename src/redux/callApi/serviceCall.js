import customAxios from '../../utils/fetchData';
import * as serviceAction from '../actions/serviceAction';
import * as alertAction from '../actions/alertAction';

export const getRate = (id, next, error) => async (dispatch) => {
    try {
        const res = await customAxios().get(`/service/get_rate/${id}`);
        console.log(res);
        dispatch(serviceAction.getRate({ rate: res.data.rate, id: id }))
        next();
    } catch (err) {
        error();
    }
}

export const reviewService = (id, auth, rate, content) => async (dispatch) => {
    try {
        const res = await customAxios(auth.token).post(`/service/review/${id}`, {
            rate, content
        })

        const newReview = {
            userId: {
                _id: auth.user._id,
                fullname: auth.user.fullname,
                avatar: auth.user.avatar
            },
            content: content,
            rate: rate
        }
        dispatch(serviceAction.reviewService({ id: id, review: newReview, star: res.data.star }))

    } catch (err) {
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}
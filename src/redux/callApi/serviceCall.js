import customAxios from '../../utils/fetchData';
import * as serviceAction from '../actions/serviceAction';
import * as alertAction from '../actions/alertAction';
import * as imageUtils from '../../utils/uploadImage'

export const getDetail = (id, next, error) => async (dispatch) => {
    try {
        const res = await customAxios().get(`/service/get_detail/${id}`);
        console.log(res);
        dispatch(serviceAction.getDetail({ rate: res.data.rate, attribute: res.data.attribute, id: id }))
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

export const createService = (token, data, images_data, next, error) => async (dispatch) => {
    try {
        let images = await imageUtils.uploadImages(images_data);
        await customAxios(token).post('/service/create_service', {
            ...data,
            images: images
        })
        next();
    }
    catch (err) {
        error();
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}
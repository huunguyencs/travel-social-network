import customAxios from '../../utils/fetchData';
import * as serviceAction from '../actions/serviceAction';
import * as alertAction from '../actions/alertAction';
import * as imageUtils from '../../utils/uploadImage';

export const getServices = (id, page) => async (dispatch) => {
    dispatch(serviceAction.loading());
    try {
        var res;
        if (id) {
            res = await customAxios().get(`/service/get_by_coop/${id}?offset=${page}`);
        }
        else {
            res = await customAxios().get(`/service/services?offset=${page}`)
        }
        if (page === 0) {
            dispatch(serviceAction.getServices({ services: res.data.services }))
        }
        else {
            dispatch(serviceAction.getMoreServices({ services: res.data.services }))
        }
    } catch (error) {
        // console.log(error);
        dispatch(serviceAction.error())
    }
}

export const getDetail = (id, next, error) => async (dispatch) => {
    try {
        const res = await customAxios().get(`/service/get_detail/${id}`);
        // console.log(res);
        dispatch(serviceAction.getDetail({ rate: res.data.rate, attribute: res.data.attribute, id: id }))
        // console.log(res.data.rate);
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

export const createService = (token, userId, data, images_data, next, error) => async (dispatch) => {
    try {
        let images = await imageUtils.uploadImages(images_data);
        const res = await customAxios(token).post('/service/create_service', {
            ...data,
            images: images
        })
        next();
        if (userId === res.data.newService.cooperator) {
            dispatch(serviceAction.addService({ newService: res.data.newService }))
        }

    }
    catch (err) {
        error();
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}
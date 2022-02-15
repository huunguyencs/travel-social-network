import * as tourAction from '../actions/tourAction';
import customAxios from '../../utils/fetchData';
import * as imageUtils from '../../utils/uploadImage'
import { createNotify, deleteNotify } from './notifyCall';
import * as alertAction from '../actions/alertAction'
import { extractProvinceTour, sortTourDate } from '../../utils/utils';
import { resetTour } from '../actions/createTourAction';

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    // console.log(dispatch)
    try {

        const res = await customAxios().get("/tour/tours");
        // console.log(res.data.tours)
        var tours = res.data.tours.map(item => sortTourDate(item));
        dispatch(tourAction.getTours({ tours: tours }));
    }
    catch (err) {
        // console.log(err);
        dispatch(tourAction.error({ error: "Có lỗi xảy ra" }))
    }
}

export const getUserTour = (id, token) => async (dispatch) => {
    // dispatch(tourAction.getTours({ tour: [] }));
    dispatch(tourAction.loading())
    try {
        const res = await customAxios(token).get(`/tour/user_tours/${id}`);
        var tours = res.data.tours.map(item => sortTourDate(item))
        // console.log(res.data.tours);
        dispatch(tourAction.getTours({ tours: tours }))
    }
    catch (err) {
        dispatch(tourAction.error({ error: "Có lỗi xảy ra" }))
        // console.log(err);
    }
}

export const saveTour = (tour, image, token, socket, next, error) => async (dispatch) => {

    try {
        // call api to save tour
        let imageUpload = [];
        if (image) imageUpload = await imageUtils.uploadImages([image]);
        // location id
        const data = {
            ...tour,
            tour: tour.tour.map(item => ({
                ...item,
                locations: item.locations.map(location => ({
                    location: location.location._id,
                })),
            })),
            provinces: Array.from(extractProvinceTour(tour.tour)),
            image: image ? imageUpload[0] : ""
        }

        const res = await customAxios(token).post('/tour/create_tour', data);

        //notify
        const dataNotify = {
            id: res.data.newTour._id,
            text: " thêm hành trình mới",
            recipients: res.data.newTour.userId.followers,
            content: res.data.newTour.name,
            image: res.data.newTour.image,
            url: `/tour/${res.data.newTour._id}`,
        }
        console.log(dataNotify);
        dispatch(createNotify(dataNotify, token, socket));
        dispatch(alertAction.success({ message: "Lưu lịch trình thành công!" }))
        dispatch(resetTour());
        next();
    }
    catch (err) {
        error();

    }
}

export const updateTour = (id, tour, image, token, next, error) => async (dispatch) => {
    try {
        let imageUpload = [image]
        if (image && typeof image !== "string") {
            imageUpload = await imageUtils.uploadImages([image]);
        }
        const data = {
            ...tour,
            tour: tour.tour.map(item => ({
                ...item,
                locations: item.locations.map(location => ({
                    location: location.location._id,
                }))
            })),
            image: image ? imageUpload[0] : "",
            provinces: Array.from(extractProvinceTour(tour.tour)),
        }
        const res = await customAxios(token).patch(`/tour/${id}`, data);
        next();
        // console.log(res.data.newTour)
        dispatch(tourAction.updateTour({ id: id, tour: res.data.newTour }));
        dispatch(alertAction.success({ message: "Cập nhật thành công!" }))
        dispatch(resetTour());
    }
    catch (err) {
        // console.log(err);
        error();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const deleteTour = (tour, token, socket, next, error) => async (dispatch) => {
    try {
        // Notify
        const dataNotify = {
            id: tour._id,
            url: `/tour/${tour._id}`,
            type: 'deleteTour'
        }
        dispatch(deleteNotify(dataNotify, token, socket));

        await customAxios(token).delete(`/tour/${tour._id}`)
        next();
        dispatch(tourAction.deleteTour({ id: tour._id }));
        dispatch(alertAction.success({ message: "Xóa thành công!" }))
    }
    catch (err) {
        // dispatch(tourAction.error({ error: err.response.data.message }));
        error();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const likeTour = (id, auth, socket, next) => async (dispatch) => {
    try {
        const res = await customAxios(auth.token).patch(`/tour/${id}/like`)
        dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));
        // console.log(res.data.likes);
        socket.emit('like', { type: 'tour', id: id, likes: res.data.likes });

        console.log(res.data.tour);
        //notify
        const dataNotify = {
            id: auth.user._id,
            text: " thích hành trình của bạn",
            recipients: [res.data.tour.userId],
            content: res.data.tour.name,
            image: res.data.tour.image,
            url: `/tour/${id}`,
        }
        dispatch(createNotify(dataNotify, auth.token, socket));
    }
    catch (err) {
        next();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const unlikeTour = (id, auth, socket, next) => async (dispatch) => {
    try {
        const res = await customAxios(auth.token).patch(`/tour/${id}/unlike`);
        dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));
        socket.emit('unlike', { type: 'tour', id: id, likes: res.data.likes });
        // Notify
        const dataNotify = {
            id: auth.user._id,
            url: `/tour/${id}`
        }
        dispatch(deleteNotify(dataNotify, auth.token, socket));
    }
    catch (err) {
        next();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const joinTour = (id, token, next, error) => async (dispatch) => {
    try {
        const res = await customAxios(token).patch(`/tour/${id}/join`);
        dispatch(tourAction.updateJoin({ id: id, joinIds: res.data.joinIds }));
        next();
    }
    catch (err) {
        error();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const unJoinTour = (id, token, next, error) => async (dispatch) => {
    try {
        const res = await customAxios(token).patch(`/tour/${id}/unjoin`);
        dispatch(tourAction.updateJoin({ id: id, joinIds: res.data.joinIds }));
        next();
    }
    catch (err) {
        error();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const removeJoin = (tourId, userId, token, next) => async (dispatch) => {
    try {
        const res = await customAxios(token).patch(`/tour/${tourId}/remove_join`, {
            user: userId
        });
        dispatch(tourAction.updateJoin({ id: tourId, joinIds: res.data.joinIds }));
    }
    catch (err) {
        next();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const removeReview = (tourDateId, token, locationId) => async (dispatch) => {
    try {
        await customAxios(token).patch(`/tour/${tourDateId}/remove_review`, {
            locationId
        })
    }
    catch (err) {
    }
}

export const getTourSaved = (token) => async (dispatch) => {
    try {
        console.log(token);
        const res = await customAxios(token).get(`/user/get_tour_saved`);
        var tours = res.data.tours.map(item => sortTourDate(item))
        // console.log(res.data.tours);
        dispatch(tourAction.getTours({ tours: tours }))
    }
    catch (err) {
        dispatch(tourAction.error({ error: "Có lỗi xảy ra" }))
    }
}
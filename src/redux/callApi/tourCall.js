import * as tourAction from '../actions/tourAction';
import customAxios from '../../utils/fetchData';
import * as imageUtils from '../../utils/uploadImage'

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.getTours({ tour: [] }));
    dispatch(tourAction.loading());
    try {

        const res = await customAxios().get("/tour/tours");

        dispatch(tourAction.getTours({ tour: res.data.tours }));
    }
    catch (err) {
        // console.log(err);
        dispatch(tourAction.error({ error: "Lỗi" }))

    }
}

export const getTourDetail = (id, next) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {

        const res = await customAxios().get(`/tour/${id}`);

        next(res.data.tour);

        // dispatch(tourAction.getTourDetail({ tourdetail: res }));
    }
    catch (err) {
        // console.log(err);
        // dispatch(tourAction.error({ error: err.response.data.message }));
    }
}

export const getUserTour = (id, token) => async (dispatch) => {
    dispatch(tourAction.getTours({ tour: [] }));
    dispatch(tourAction.loading())
    try {
        const res = await customAxios(token).get(`/tour/user_tours/${id}`);
        // console.log(res.data.tours);
        dispatch(tourAction.getTours({ tour: res.data.tours }))
    }
    catch (err) {
        dispatch(tourAction.error({ error: "Lỗi" }))
        // console.log(err);
    }
}

export const saveTour = (tour, image, token, next, error) => async (dispatch) => {

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
                }))
            })),
            image: image ? imageUpload[0] : ""
        }


        const res = await customAxios(token).post('/tour/create_tour', data);
        next();
        dispatch(tourAction.addTour({ tour: res.data.newTour }))

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
            image: image ? imageUpload[0] : ""
        }

        console.log(data);


        const res = await customAxios(token).patch(`/tour/${id}`, data);
        next();
        // console.log(res.data.newTour)
        dispatch(tourAction.updateTour({ id: id, tour: res.data.newTour }))

    }
    catch (err) {
        console.log(err);
        error();

    }
}

export const deleteTour = (id, token, next, error) => async (dispatch) => {
    try {
        // call api to delete tour
        await customAxios(token).delete(`/tour/${id}`)
        next();
        dispatch(tourAction.deleteTour({ id: id }));
    }
    catch (err) {
        // dispatch(tourAction.error({ error: err.response.data.message }));
        error();
    }
}

export const likeTour = (id, token, socket, next) => async (dispatch) => {

    try {

        const res = await customAxios(token).patch(`/tour/${id}/like`)
        dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));
        // console.log(res.data.likes);
        socket.emit('like', { type: 'tour', id: id, likes: res.data.likes });
    }
    catch (err) {
        next();
    }
}

export const unlikeTour = (id, token, socket, next) => async (dispatch) => {


    try {

        const res = await customAxios(token).patch(`/tour/${id}/unlike`);
        dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));
        // console.log(res.data.likes);
        socket.emit('unlike', { type: 'tour', id: id, likes: res.data.likes });
    }
    catch (err) {
        next();
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
    }
}
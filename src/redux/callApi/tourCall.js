import * as tourAction from '../actions/tourAction';
import customAxios from '../../utils/fetchData';
import * as notifyAction from '../actions/notifyAction';
import * as imageUtils from '../../utils/uploadImage'

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {

        const res = await customAxios().get("/tour/tours");
        console.log(res);

        dispatch(tourAction.getTours({ tour: res.data.tours }));
    }
    catch (err) {
        console.log(err);
        // dispatch(tourAction.error({ error: err.response.data.message }))

    }
}

export const getTourDetail = (id, next) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {

        const res = await customAxios().get(`/tour/${id}`);
        console.log(res.data.tour);

        next(res.data.tour);

        // dispatch(tourAction.getTourDetail({ tourdetail: res }));
    }
    catch (err) {
        console.log(err);
        // dispatch(tourAction.error({ error: err.response.data.message }));
    }
}

export const updateTour = (data) => async (dispatch) => {

    try {
        // 
        const res = 0;

        dispatch(tourAction.updateTour({ tour: res }));

    }
    catch (err) {

    }
}



export const createTourCall = (tour, image, token, next) => async (dispatch) => {

    dispatch(notifyAction.callStart());

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
                    cost: location.cost,
                }))
            })),
            image: image ? imageUpload[0] : ""
        }

        console.log(data);

        const res = await customAxios(token).post('tour/create_tour', data);
        console.log(res);

        // const res = 0;

        // dispatch(tourAction.createTour({ tour: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
        next();
    }
    catch (err) {
        console.log(err);
        dispatch(notifyAction.callFail({ error: err.response.data.message }))
    }
}

export const deleteTour = (data) => async (dispatch) => {
    try {
        // call api to delete tour
        dispatch(tourAction.deleteTour());
    }
    catch (err) {
        dispatch(tourAction.error({ error: err.response.data.message }));
    }
}

export const likeTour = (id, token, next) => async (dispatch) => {


    try {

        const res = await customAxios(token).patch(`tour/${id}/like`)
        dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));

    }
    catch (err) {
        next();
    }
}

export const unlikeTour = (id, token, next) => async (dispatch) => {


    try {

        const res = await customAxios(token).patch(`tour/${id}/unlike`);
        dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));

    }
    catch (err) {
        next();
    }
}
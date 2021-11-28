import * as tourAction from '../actions/tourAction';
import * as notifyAction from '../actions/notifyAction';
import customAxios from '../../utils/fetchData';
import * as imageUtils from '../../utils/uploadImage'

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {

        const res = await customAxios().get("/tour/tours");
        console.log(res);

        dispatch(tourAction.getTours({ tour: res.data.tours }));
    }
    catch (err) {
        // console.log(err.response.data.message);
        dispatch(tourAction.error({ error: err.response.data.message }))
    }
}

export const getTourDetail = (id, next) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {
        // const res = {
        //     _id: 1321,
        //     tourName: "Đây là tiêu đề của tour",
        //     tourDate: [
        //         {
        //             _id: 3123,
        //             date: "12/11/2021",
        //             locations: [
        //                 {
        //                     _id: 2514,
        //                     location: {
        //                         _id: 1313,
        //                         image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        //                         locationName: "Chùa Một Cột",
        //                         province: {
        //                             _id: 45456,
        //                             name: "Hà Nội"
        //                         }
        //                     },
        //                     cost: 200,
        //                     postId: 221,
        //                 },
        //                 {
        //                     _id: 525,
        //                     location: {
        //                         _id: 1313,
        //                         image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        //                         locationName: "Chùa Một Cột",
        //                         province: {
        //                             _id: 45456,
        //                             name: "Hà Nội"
        //                         }
        //                     },
        //                     cost: 200,
        //                     postId: 221,
        //                 }
        //             ]
        //         },
        //         {
        //             _id: 789,
        //             date: "13/11/2021",
        //             locations: [
        //                 {
        //                     _id: 2514,
        //                     location: {
        //                         _id: 1313,
        //                         image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        //                         locationName: "Chùa Một Cột",
        //                         province: {
        //                             _id: 45456,
        //                             name: "Hà Nội"
        //                         }
        //                     },
        //                     cost: 200,
        //                     postId: 221,
        //                 },
        //             ]
        //         }
        //     ],
        //     content: "Cùng khám phá Hà Nội",
        //     hashtags: ["#dulich", '#bien'],
        //     isPublic: true,
        //     taggedIds: [],
        //     likeIds: [],
        //     comment: [],
        //     user: {
        //         _id: "3132",
        //         userName: "huunguyen",
        //         firstName: "A",
        //         lastName: "Trần Văn",
        //         avatarImage: "",
        //     },
        // };

        const res = await customAxios().get(`tour/${id}`);
        console.log(res.data.tour);

        next(res.data.tour);

        // dispatch(tourAction.getTourDetail({ tourdetail: res }));
    }
    catch (err) {
        dispatch(tourAction.error({ error: err.response.data.message }));
    }
}

export const updateTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // 
        const res = 0;

        dispatch(tourAction.updateTour({ tour: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}



export const createTourCall = (tour, image, token, next) => async (dispatch) => {

    // dispatch(notifyAction.callStart());

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
        // dispatch(notifyAction.callSuccess({ message: "" }));
        next();
    }
    catch (err) {
        console.log(err);
        // dispatch(notifyAction.callFail({ error: err.response.data.message }))
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

export const likeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const unlikeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}
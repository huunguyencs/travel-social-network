import * as volunteerAction from '../actions/volunteerAction';
import customAxios from '../../utils/fetchData';
import * as imageUtils from '../../utils/uploadImage'
import { createNotify, deleteNotify } from './notifyCall';
import * as alertAction from '../actions/alertAction'


export const getVolunteers = (data) => async (dispatch) => {
    dispatch(volunteerAction.loading());
    try {
        const res = await customAxios().get("/volunteer/volunteers");
        // console.log(res.data.volunteers)
        dispatch(volunteerAction.getVolunteers({ volunteers: res.data.volunteers }));
    }
    catch (err) {
        // console.log(err);
        dispatch(volunteerAction.error({ error: "Có lỗi xảy ra" }))
    }
}


// export const saveTour = (tour, image, token, socket, next, error) => async (dispatch) => {

//     try {
//         // call api to save tour
//         let imageUpload = [];
//         if (image) imageUpload = await imageUtils.uploadImages([image]);
//         // location id
//         const data = {
//             ...tour,
//             tour: tour.tour.map(item => ({
//                 ...item,
//                 locations: item.locations.map(location => ({
//                     location: location.location._id,
//                 })),
//             })),
//             provinces: Array.from(extractProvinceTour(tour.tour)),
//             image: image ? imageUpload[0] : ""
//         }

//         const res = await customAxios(token).post('/tour/create_tour', data);


//         // dispatch(tourAction.addTour({ tour: res.data.newTour }))


//         //notify
//         const dataNotify = {
//             id: res.data.newTour._id,
//             text: " thêm hành trình mới",
//             recipients: res.data.newTour.userId.followers,
//             content: res.data.newTour.name,
//             image: res.data.newTour.image,
//             url: `/tour/${res.data.newTour._id}`,
//         }
//         console.log(dataNotify);
//         dispatch(createNotify(dataNotify, token, socket));
//         dispatch(alertAction.success({ message: "Lưu lịch trình thành công!" }))
//         dispatch(resetTour());
//         next();
//     }
//     catch (err) {
//         error();

//     }
// }

// export const updateTour = (id, tour, image, token, next, error) => async (dispatch) => {
//     try {
//         let imageUpload = [image]
//         if (image && typeof image !== "string") {
//             imageUpload = await imageUtils.uploadImages([image]);
//         }
//         const data = {
//             ...tour,
//             tour: tour.tour.map(item => ({
//                 ...item,
//                 locations: item.locations.map(location => ({
//                     location: location.location._id,
//                 }))
//             })),
//             image: image ? imageUpload[0] : ""
//         }

//         // console.log(data);


//         const res = await customAxios(token).patch(`/tour/${id}`, data);
//         next();
//         // console.log(res.data.newTour)
//         dispatch(tourAction.updateTour({ id: id, tour: res.data.newTour }));
//         dispatch(alertAction.success({ message: "Cập nhật thành công!" }))
//         dispatch(resetTour());
//     }
//     catch (err) {
//         // console.log(err);
//         error();
//         if (err.response && err.response.data && err.response.data.message)
//             dispatch(alertAction.error({ message: err.response.data.message }))
//         else
//             dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
//     }
// }

// export const deleteTour = (tour, token, socket, next, error) => async (dispatch) => {
//     try {
//         // Notify
//         const dataNotify = {
//             id: tour._id,
//             url: `/tour/${tour._id}`,
//             type: 'deleteTour'
//         }
//         dispatch(deleteNotify(dataNotify, token, socket));

//         await customAxios(token).delete(`/tour/${tour._id}`)
//         next();
//         dispatch(tourAction.deleteTour({ id: tour._id }));
//         dispatch(alertAction.success({ message: "Xóa thành công!" }))
//     }
//     catch (err) {
//         // dispatch(tourAction.error({ error: err.response.data.message }));
//         error();
//         if (err.response && err.response.data && err.response.data.message)
//             dispatch(alertAction.error({ message: err.response.data.message }))
//         else
//             dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
//     }
// }

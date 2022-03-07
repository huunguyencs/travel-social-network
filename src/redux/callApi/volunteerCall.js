import * as volunteerAction from '../actions/volunteerAction';
import customAxios from '../../utils/fetchData';
import * as alertAction from '../actions/alertAction';
import * as imageUtils from '../../utils/uploadImage';

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
export const createVolunteer = (token, userId, data, images_data, next, error) => async (dispatch) => {
    try {
        let images = await imageUtils.uploadImages(images_data);
        console.log("data", data);
        await customAxios(token).post('/volunteer/create_volunteer', {
            ...data,
            image: images[0]
        })
        next();
        // if (userId === res.data.newService.cooperator) {
        //     dispatch(serviceAction.addService({ newService: res.data.newService }))
        // }
        dispatch(alertAction.success({ message: "Đã gửi thông tin thành công!" }));
    }
    catch (err) {
        error();
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}

export const deleteVolunteer = (volunteer, token, socket, next, error) => async (dispatch) => {
    try {
        // Notify
        // const dataNotify = {
        //     id: tour._id,
        //     url: `/tour/${tour._id}`,
        //     type: 'deleteTour'
        // }
        // dispatch(deleteNotify(dataNotify, token, socket));

        await customAxios(token).delete(`/volunteer/${volunteer._id}`)
        next();
        dispatch(volunteerAction.deleteVolunteer({ id: volunteer._id }));
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

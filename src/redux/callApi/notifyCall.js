import customAxios from '../../utils/fetchData';
import * as notifyAction from '../actions/notifyAction';
export const createNotify = (data, token, socket) => async (dispatch) => {
    try {
        const res = await customAxios(token).post('/notify/create_notify', data);
        socket.emit('createNotify', res.data.newNotify);
        // console.log(res.data.newNotify);
    } catch (error) {
        console.log(error);
    }
}

export const deleteNotify = (dataNotify, token, socket) => async (dispatch) => {
    try {
        const res = await customAxios(token).delete(`/notify/${dataNotify.id}?url=${dataNotify.url}&type=${dataNotify.type}`);
        if (res.data.notify !== null) socket.emit('deleteNotify', res.data.notify);

    } catch (error) {
        console.log(error);
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await customAxios(token).get('/notify/get_notifies?limit=4&offset=0');
        // console.log(res.data);
        dispatch(notifyAction.getNotifies(res.data.notifies));
    } catch (error) {
        console.log(error);
    }
}

export const isSeenNotify = (data, token) => async (dispatch) => {
    try {
        if (!data.seen) {
            const res = await customAxios(token).patch(`/notify/isSeenNotify/${data._id}`);
            dispatch(notifyAction.updateNotify(res.data.notify))
        }
    } catch (error) {
        console.log(error);
    }
}
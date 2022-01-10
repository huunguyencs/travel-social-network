import customAxios from '../../utils/fetchData';
import * as notifyAction from '../actions/notifyAction';
export const createNotify = (data,token,socket) => async (dispatch) => {
    try {
        const res = await customAxios(token).post('/notify/create_notify',data);
        // console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const deleteNotify = (id, token,socket) => async (dispatch) => {
    try {
        const res = await customAxios(token).delete(`/notify/${id}`);
        // console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await customAxios(token).get('/notify/get_notifies');
        dispatch(notifyAction.getNotifies(res.data.notifies));
    } catch (error) {
        console.log(error);
    }
}
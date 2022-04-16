import customAxios from '../../utils/fetchData'
import { getHelpsAction } from '../actions/helpAction';


export const getHelps = (lat, lng) => async (dispatch) => {
    try {
        const res = await customAxios().get(`/help?lat=${lat}&lng=${lng}`);
        if (!res.data.success) {
            return;
        };
        dispatch(getHelpsAction(res.data.helps))
    }
    catch (err) {
        console.log(err);
    }
}

export const addHelp = async (token, data, socket) => {
    try {
        const res = await customAxios(token).post('/help', data);
        if (!res.data.success) return;
        socket.emit('createHelp', res.data.help)

    } catch (err) {

    }
}

export const updateHelp = async (token, id, data, socket) => {
    try {
        const res = await customAxios(token).put(`/help/${id}`, data);
        if (!res.data.success) return;
        socket.emit('updateHelp', res.data.help)

    } catch (err) {

    }
}

export const deleteHelp = async (token, id, socket) => {
    try {
        const res = await customAxios(token).delete(`/help/${id}`);
        if (!res.data.success) return;
        socket.emit('deleteHelp', id)

    } catch (err) {

    }
}
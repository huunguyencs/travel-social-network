import * as locationActions from '../actions/locationAction';
import * as notifyActions from '../actions/notifyAction';
import customAxios from '../../utils/fetchData';

export const getProvinces = (data) => async (dispatch) => {
    dispatch(notifyActions.callStart());
    try {
        const res = await customAxios().get('/province/provinces');
        dispatch(locationActions.getProvinces({ provinces: res.data.provinces }));
        dispatch(notifyActions.callSuccess({ message: "" }))
    }
    catch (err) {
        // dispatch(notifyActions.callFail({ error: err }))
    }
}

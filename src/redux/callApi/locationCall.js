import * as locationActions from '../actions/locationAction';
import * as alertAction from '../actions/alertAction';
import customAxios from '../../utils/fetchData';

export const getProvinces = (data) => async (dispatch) => {
    // dispatch(alertActions.callStart());
    dispatch(locationActions.loading())
    try {
        const res = await customAxios().get('/province/provinces');
        dispatch(locationActions.getProvinces({ provinces: res.data.provinces }));
        // dispatch(alertAction.callSuccess({ message: "" }))
    }
    catch (err) {
        // dispatch(notifyActions.callFail({ error: err }))
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

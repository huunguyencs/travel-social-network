import * as locationActions from '../actions/locationAction';
import * as notifyActions from '../actions/notifyAction';

export const getLocations = (data) => async (dispatch) => {

    dispatch(notifyActions.callStart());

    try {
        // call api to get location list
        const res;
        dispatch(locationActions.getLoctions({ location: res }));
        dispatch(notifyActions.callSuccess());
    }
    catch (err) {
        dispatch(notifyActions.callFail({ error: err }));
    }
}

export const getLocationHot = (data) => async (dispatch) => {
    dispatch(locationActions.loading());

    try {
        const res;
        dispatch(locationActions.getLocationHot({ hot: res }));
    }
    catch (err) {
        dispatch(locationActions.error({ error: err }));
    }
}
import * as tourAction from '../actions/tourAction';
import * as notifyAction from '../actions/notifyAction';


export const saveTour = (data) => async (dispatch) => {

    dispatch(notifyAction.callStart());

    try {
        // call api to save tour

        dispatch(notifyAction.callSuccess());
        dispatch(tourAction.resetTour());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const deleteTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // call api to delete tour
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}
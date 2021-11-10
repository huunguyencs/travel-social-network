import * as tourAction from '../actions/tourAction';


export const saveTour = (props) => async (dispatch) => {

    dispatch(tourAction.callStart());

    try {
        // call api to save tour

        dispatch(tourAction.callSuccess());
        dispatch(tourAction.resetTour());
    }
    catch (err) {
        dispatch(tourAction.callFail({ error: err }))
    }
}

export const deleteTour = (props) => async (dispatch) => {
    dispatch(tourAction.callStart());
    try {
        // call api to delete tour
        dispatch(tourAction.callSuccess());
    }
    catch (err) {
        dispatch(tourAction.callFail({ error: err }));
    }
}
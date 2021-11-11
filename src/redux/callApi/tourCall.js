import * as tourAction from '../actions/tourAction';
import * as notifyAction from '../actions/notifyAction';

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {
        // call api to get tours
        const res;

        dispatch(tourAction.getTours({ tour: res.data }));
    }
    catch (err) {
        dispatch(tourAction.error({ error: err }))
    }
}

export const updateTour = (data) => async (dispatch) => {
    dispatch(notifyAction.loading());
    try {
        // 

        dispatch(tourAction.updateTour({ tour: res.data }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}



export const createTour = (data) => async (dispatch) => {

    dispatch(notifyAction.callStart());

    try {
        // call api to save tour

        const res;

        dispatch(tourAction.createTour({ tour: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const deleteTour = (data) => async (dispatch) => {
    try {
        // call api to delete tour
        dispatch(tourAction.deleteTour());
    }
    catch (err) {
        dispatch(tourAction.error({ error: err }));
    }
}

export const likeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const unlikeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}
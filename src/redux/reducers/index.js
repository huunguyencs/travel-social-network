import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import notify from './notifyReducer';
import location from './locationReducer';
import auth from './authReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    createTour,
    notify,
    location,
    auth,
    user
});

export default rootReducer;
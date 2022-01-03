import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import notify from './notifyReducer';
import tour from './tourReducer';
import location from './locationReducer';
import auth from './authReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    tour,
    createTour,
    notify,
    location,
    auth,
    user
});

export default rootReducer;
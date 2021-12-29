import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import notify from './notifyReducer';
import post from './postReducer';
import tour from './tourReducer';
import location from './locationReducer';
import auth from './authReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    post,
    tour,
    createTour,
    notify,
    location,
    auth,
    user
});

export default rootReducer;
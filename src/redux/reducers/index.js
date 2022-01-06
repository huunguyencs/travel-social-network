import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import notify from './notifyReducer';
import location from './locationReducer';
import auth from './authReducer';
import user from './userReducer';
import post from './postReducer';
import tour from './tourReducer';
import socket from './socketReducer';
const rootReducer = combineReducers({
    post,
    createTour,
    notify,
    location,
    auth,
    socket,
    user,
    tour
});

export default rootReducer;
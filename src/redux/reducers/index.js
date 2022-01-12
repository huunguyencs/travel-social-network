import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import alert from './alertReducer';
import location from './locationReducer';
import auth from './authReducer';
import user from './userReducer';
import post from './postReducer';
import tour from './tourReducer';
import socket from './socketReducer';
import notify from './notifyReducer';

const rootReducer = combineReducers({
    post,
    createTour,
    alert,
    location,
    auth,
    socket,
    user,
    tour,
    notify
});

export default rootReducer;
import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import notify from './notifyReducer';
import post from './postReducer';
import tour from './tourReducer';

const rootReducer = combineReducers({
    post,
    tour,
    createTour,
    notify,
});

export default rootReducer;
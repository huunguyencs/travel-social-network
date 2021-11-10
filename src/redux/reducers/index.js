import { combineReducers } from 'redux';

import tour from './tourReducer';
import notify from './notifyReducer';

const rootReducer = combineReducers({
    tour,
    notify,
});

export default rootReducer;
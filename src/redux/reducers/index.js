import { combineReducers } from 'redux';

import tour from './tourReducer';

const rootReducer = combineReducers({
    tour,
});

export default rootReducer;
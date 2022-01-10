import * as NOTIFY_TYPES from '../constants/notifyConstant';
const INIT_STATE = {
    loading: false,
    data : []
}

const notify1Reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return state;
            break;
    }
}

export default notify1Reducer;
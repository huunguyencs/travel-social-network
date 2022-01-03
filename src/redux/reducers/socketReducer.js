import * as SOCKET_TYPES from '../constants/index';

const socketReducer = (state = [], action) => {
    switch (action.type) {
        case SOCKET_TYPES.SOCKET: {
            return action.payload
        }
        default: return state
    }
}

export default socketReducer
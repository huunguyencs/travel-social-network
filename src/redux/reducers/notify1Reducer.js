import * as NOTIFY_TYPES from '../constants/notifyConstant';
const INIT_STATE = {
    loading: false,
    data : []
}

const notify1Reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.CREATE_NOTIFY: 
            return{
                ...state,
                data: [action.payload, ...state.data]
            }
            break;

        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload
            }
            break;
        case NOTIFY_TYPES.UPDATE_NOTIFY:
            return{
                ...state,
                data: state.data.map( item => item._id === action.payload._id ? 
                    {
                        ...item,
                        seen: action.payload.seen
                    } : item
                    )
            }
            break;
        case NOTIFY_TYPES.DELETE_NOTIFY:
            return{
                ...state,
                data: state.data.filter(item => item._id !== action.payload._id)
            }
            break;
        default:
            return state;
            break;
    }
}

export default notify1Reducer;
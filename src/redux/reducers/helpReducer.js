import * as HELP_TYPES from '../constants/helpConstant';

const INIT_STATE = {
    list: []
}

const helpReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case HELP_TYPES.GET_HELPS: {
            return {
                ...state,
                list: action.payload
            }
        }
        case HELP_TYPES.ADD_HELP: {
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        }
        case HELP_TYPES.UPDATE_HELP: {
            return {
                ...state,
                list: state.list.map(item => item._id === action.payload._id ? action.payload : item)
            }
        }
        case HELP_TYPES.DELETE_HELP: {
            return {
                ...state,
                list: state.list.filter(item => item._id !== action.payload.id)
            }
        }
        default: {
            return state
        }
    }
}

export default helpReducer;
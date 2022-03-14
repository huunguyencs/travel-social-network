import * as MESSAGE_TYPES from "../constants/messageConstant";

const INIT_STATE = {
    users: [],
    data: [],
    firstLoad: false
}

const messageReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.ADD_USER:
            if (state.users.every(item => item._id !== action.payload._id)) {
                return {
                    ...state,
                    users: [action.payload, ...state.users]
                };
            }
            return state;
        case MESSAGE_TYPES.ADD_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? { ...user, text: action.payload.text }
                        : user
                )
            }
        case MESSAGE_TYPES.GET_CONVERSATIONS:
            return {
                ...state,
                users: action.payload,
                firstLoad: true
            }
        case MESSAGE_TYPES.GET_MESSAGES:
            return {
                ...state,
                data: action.payload
            }
        case MESSAGE_TYPES.DELETE_CONVERSATION:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload._id),
                data: []
            };
        default:
            return state;

    }
}

export default messageReducer;
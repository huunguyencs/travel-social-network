import * as MESSAGE_TYPES from "../constants/messageConstant";

const INIT_STATE = {
    conversations: [],
    data: [],
    firstLoad: false
}

const messageReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.ADD_USER:
            if (state.conversations.every(item => item._id !== action.payload._id)) {
                return {
                    ...state,
                    conversations: [action.payload, ...state.conversations]
                };
            }
            return state;
        case MESSAGE_TYPES.ADD_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload],
                conversations: state.conversations.map(user =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? { ...user, text: action.payload.text }
                        : user
                )
            }
        case MESSAGE_TYPES.GET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
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
                conversations: state.conversations.filter(user => user._id !== action.payload),
                data: []
            };
        default:
            return state;

    }
}

export default messageReducer;
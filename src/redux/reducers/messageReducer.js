import * as MESSAGE_TYPES from "../constants/messageConstant";

const INIT_STATE = {
    users: [],
    data: [],
    firstLoad: false
}

const messageReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case MESSAGE_TYPES.ADD_MESSAGE:
            return{
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user => 
                    user._id === action.payload.recipient || user._id === action.payload.sender
                    ? {...user, text: action.payload.text}
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
            return{
                ...state,
                data: action.payload
            }
        default:
            return state;

    }
}

export default messageReducer;
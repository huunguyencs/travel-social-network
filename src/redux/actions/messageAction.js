import * as MESSAGE_TYPES from '../constants/messageConstant';

export const addUser = (props) => {
    return {
        type: MESSAGE_TYPES.ADD_USER,
        payload: props,
    }
}

export const addMessage = (props) => {
    return{
        type: MESSAGE_TYPES.ADD_MESSAGE,
        payload: props
    }
}

export const getConversations = (props) => {
    return{
        type: MESSAGE_TYPES.GET_CONVERSATIONS,
        payload: props
    }
}

export const getMessages = (props) =>{
    return{
        type: MESSAGE_TYPES.GET_MESSAGES,
        payload: props
    }
}
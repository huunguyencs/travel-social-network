import * as NOTIFY_TYPES from '../constants/notifyConstant';

export const callStart = (props) => {
    return {
        type: NOTIFY_TYPES.CALL_START,
    }
}

export const callSuccess = (props) => {
    return {
        type: NOTIFY_TYPES.CALL_SUCCESS,
        payload: props,
    }
}

export const callFail = (props) => {
    return {
        type: NOTIFY_TYPES.CALL_FAIL,
        payload: props,
    }
}

export const getNotifies = (props) =>{
    return{
        type: NOTIFY_TYPES.GET_NOTIFIES,
        payload: props,
    }
}

export const updateNotify = (props) =>{
    return{
        type: NOTIFY_TYPES.UPDATE_NOTIFY,
        payload: props,
    }
}

export const createNotify = (props)=>{
    return{
        type: NOTIFY_TYPES.CREATE_NOTIFY,
        payload: props
    }
}

export const deleteNotify = (props)=>{
    return{
        type: NOTIFY_TYPES.DELETE_NOTIFY,
        payload: props
    }
}
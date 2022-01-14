import customAxios from "../../utils/fetchData";
import* as messageAction from "../actions/messageAction";


export const addUser = (user, message, socket) => async (dispatch) => {
    try {
        if(message.users.every(item => item._id !== user._id)){
            dispatch(messageAction.addUser(user));
            // console.log(user);
        }
    } catch (err) {
        console.log(err);
    }
}

export const addMessage = (msg, auth, socket) => async(dispatch) =>{
    try{
        dispatch(messageAction.addMessage(msg));
        const res = await customAxios(auth.token).post('/message/create_message', msg)
        // console.log(res.data)
    }catch(err){
        console.log(err);
    }
}

export const getConversations = (auth, socket) => async(dispatch)=>{
    try {
        const res = await customAxios(auth.token).get('/message/get_conversations');
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}
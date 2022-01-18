import customAxios from "../../utils/fetchData";
import* as messageAction from "../actions/messageAction";


export const addUser = (user, message, socket) => async (dispatch) => {
    try {
        if(message.users.every(item => item._id !== user._id)){
            dispatch(messageAction.addUser({...user,seen:true}));
            // console.log(user);
        }
    } catch (err) {
        console.log(err);
    }
}

export const addMessage = (msg, auth, socket) => async(dispatch) =>{
    try{
        dispatch(messageAction.addMessage(msg));
        await customAxios(auth.token).post('/message/create_message', msg)
        socket.emit('addMessage',{msg,user: auth.user});
    }catch(err){
        console.log(err);
    }
}

export const getConversations = (auth, socket) => async(dispatch)=>{
    try {
        const res = await customAxios(auth.token).get('/message/get_conversations');
    //    console.log(res.data);
       let newArr = [];
       res.data.conversations.forEach(conversation => {
           conversation.members.forEach( item =>{ 
               if(item._id !== auth.user._id){ 
                   newArr.push({...item, text:conversation.text})
               }
           })
       });
    //    console.log(newArr);
       dispatch(messageAction.getConversations(newArr))

    } catch (err) {
        console.log(err);
    }
}

export const getMessages = (id,auth, socket) => async(dispatch)=>{
    try {
        const res = await customAxios(auth.token).get(`/message/get_messages/${id}`);
        // console.log(res.data);
        dispatch(messageAction.getMessages(res.data.messages))

    } catch (err) {
        console.log(err);
    }
}

export const deleteConversation = (data, auth, socket) => async(dispatch) =>{ 
    try {
        const res = await customAxios(auth.token).delete(`/message/delete_conversation/${data.id}`);
        // console.log(res.data);
        dispatch(messageAction.deleteConversation(res.data.messages))

    } catch (err) {
        console.log(err);
    }
}
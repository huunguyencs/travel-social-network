import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postAction from './redux/actions/postAction';
import * as commentAction from './redux/actions/commentAction';

const SocketClient = () => {
    const {auth, socket} = useSelector(state => state);
    const dispatch = useDispatch();
    
    //connect
    useEffect(()=>{
        socket.emit('joinUser',auth.user._id)
    },[socket, auth.user._id])
    
    //like
    useEffect(()=>{
        socket.on('likeToClient', newPost =>{
            // console.log(newPost);
            dispatch(postAction.updateLike(newPost));
        })

        return ()=> socket.off('likeToClient');
    },[socket])
    
    //unlike
    useEffect(() =>{ 
        socket.on('unlikeToClient',newPost =>{
            // console.log(newPost);
            dispatch(postAction.updateLike(newPost));
        })
        return () => socket.off('unlikeToClient');
    },[socket])

    //comment Post
    useEffect(() =>{
        socket.on('createCommentPostToClient', newPost =>{ 
            dispatch(commentAction.addCommentPost(newPost));
        })
        return () => socket.off('createCommentPostToClient');
    },[socket])

    
    return <></>
}

export default SocketClient;
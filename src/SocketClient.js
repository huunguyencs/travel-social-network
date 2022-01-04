import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postAction from './redux/actions/postAction';
import * as commentAction from './redux/actions/commentAction';
import * as authAction from './redux/actions/authAction';

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
    },[socket,dispatch])
    
    //unlike
    useEffect(() =>{ 
        socket.on('unlikeToClient',newPost =>{
            // console.log(newPost);
            dispatch(postAction.updateLike(newPost));
        })
        return () => socket.off('unlikeToClient');
    },[socket,dispatch])

    //comment Post
    useEffect(() =>{
        socket.on('createCommentPostToClient', newPost =>{ 
            dispatch(commentAction.addCommentPost(newPost));
        })
        return () => socket.off('createCommentPostToClient');
    },[socket,dispatch])

    //follow
    useEffect(()=>{
        socket.on('followToClient', newUser=>{
            dispatch(authAction.follow({
                user: {
                    _id: newUser._id,
                    username: newUser.username,
                    avatar: newUser.avatar,
                    fullname: newUser.fullname,
                }
            }))
            console.log(newUser);
        })
        return () => socket.off('followToClient');
    },[socket,dispatch])

    //unfollow
    useEffect(()=>{
        socket.on('unfollowToClient', newUser=>{
            dispatch(authAction.unfollow({ user: newUser }))
        })
        return () => socket.off('unfollowToClient');
    },[socket,dispatch])
    
    return <></>
}

export default SocketClient;
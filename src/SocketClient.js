import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postAction from './redux/actions/postAction';
import * as commentAction from './redux/actions/commentAction';
import * as authAction from './redux/actions/authAction';
import * as userAction from './redux/actions/userAction';
import * as tourAction from './redux/actions/tourAction';
import * as notifyAction from './redux/actions/notifyAction';
const SocketClient = () => {
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    //connect
    useEffect(() => {
        if (auth.user) {
            socket.emit('joinUser', auth.user._id)
        }

    }, [socket, auth.user])

    //like
    useEffect(() => {
        socket.on('likeToClient', data => {
            // console.log(newPost);
            switch (data.type) {
                case 'post':
                    dispatch(postAction.updateLike({ id: data.id, likes: data.likes }));
                    break;
                case 'tour':
                    dispatch(tourAction.updateLike({ id: data.id, likes: data.likes }));
                    break;
                case 'commentPost':
                    dispatch(commentAction.updateCommentPost({ comment: data.comment, id: data.id, postId: data.postId }))
                    break;
                case 'commentTour':
                    dispatch(commentAction.updateCommentTour({ comment: data.comment, id: data.id, tourId: data.tourId }))
                    break;
                default:
                    break;
            }
        })

        return () => socket.off('likeToClient');
    }, [socket, dispatch])

    //unlike
    useEffect(() => {
        socket.on('unlikeToClient', data => {
            switch (data.type) {
                case 'post':
                    dispatch(postAction.updateLike({ id: data.id, likes: data.likes }));
                    break;
                case 'tour':
                    dispatch(tourAction.updateLike({ id: data.id, likes: data.likes }));
                    break;
                case 'commentPost':
                    dispatch(commentAction.updateCommentPost({ comment: data.comment, id: data.id, postId: data.postId }))
                    break;
                case 'commentTour':
                    dispatch(commentAction.updateCommentTour({ comment: data.comment, id: data.id, tourId: data.tourId }))
                    break;
                default:
                    break;
            }
        })
        return () => socket.off('unlikeToClient');
    }, [socket, dispatch])

    //create Comment
    useEffect(() => {
        socket.on('createCommentToClient', data => {
            switch (data.type) {
                case 'post':
                    dispatch(commentAction.addCommentPost({ id: data.id, comment: data.comment }));
                    break;
                case 'tour':
                    dispatch(commentAction.addCommentTour({ id: data.id, comment: data.comment }));
                    break;
                default:
                    break;
            }
        })
        return () => socket.off('createCommentToClient');
    }, [socket, dispatch])

    //follow
    useEffect(() => {
        socket.on('followToClient', data => {
            dispatch(userAction.updateFollower({ followers: data.followers }));
            dispatch(authAction.updateFollowing({ followings: data.followings }));
        })
        return () => socket.off('followToClient');
    }, [socket, dispatch])

    //unfollow
    useEffect(() => {
        socket.on('unfollowToClient', data => {
            dispatch(userAction.updateFollower({ followers: data.followers }));
            dispatch(authAction.updateFollowing({ followings: data.followings }));
        })
        return () => socket.off('unfollowToClient');
    }, [socket, dispatch])

    //create notify
    useEffect(()=>{
        socket.on('createNotifyToClient', data=>{
            dispatch(notifyAction.createNotify(data));
        })
        return () => socket.off('createNotifyToClient');
    },[socket,dispatch])

    //delete notify 
    useEffect(()=>{
        socket.on('deleteNotifyToClient', data=>{
            dispatch(notifyAction.deleteNotify(data));
        })
        return () => socket.off('deleteNotifyToClient');
    },[socket,dispatch])
    return <></>
}

export default SocketClient;
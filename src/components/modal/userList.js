import { Avatar, Button, CircularProgress, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { follow, unfollow } from "../../redux/callApi/authCall";
import { modalListStyles } from "../../style";


export default function UserList(props) {

    const { title, listUser, handleClose } = props;
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [followings, setFollowings] = useState([]);
    const [stateFollow, setStateFollow] = useState({
        id: null,
        loading: false,
        error: false,
    })

    const classes = modalListStyles();

    const handleFollow = (userId) => {
        if (isFollowed(userId)) {
            setStateFollow({
                id: userId,
                loading: true,
                error: false
            })
            dispatch(unfollow(auth.token, userId, () => {
                setStateFollow({
                    id: userId,
                    loading: false,
                    error: true
                })
            }));
            setStateFollow({
                id: userId,
                loading: false,
                error: false
            })
        }
        else {
            setStateFollow({
                id: userId,
                loading: true,
                error: false
            })
            dispatch(follow(auth.token, userId, () => {
                setStateFollow({
                    id: userId,
                    loading: false,
                    error: true
                })
            }));
            setStateFollow({
                id: userId,
                loading: false,
                error: false
            })
        }
    }

    const isFollowed = (id) => {
        for (const u of followings) {
            // console.log(u._id);
            if (u._id === id) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        setFollowings(auth.user.followings);
    }, [auth.user.followings])

    return (
        <div className={classes.paper}>
            <div className={classes.modal_header}>
                <h2 className={classes.modal_header_left}>{title}: {listUser.length}</h2>
                <div className={classes.modal_header_right}>
                    <IconButton onClick={handleClose}>
                        <Close className={classes.modal_header_closeIcon} />
                    </IconButton>
                </div>
            </div>
            <ul>
                {listUser.map((user) => (
                    <li button className={classes.modal_body_user} key={user._id}>

                        <div className={classes.avatar}>
                            <Avatar alt="avatar" src={user.avatar} />
                        </div>
                        <div className={classes.fullname}>
                            <Link to={`/profile/${user._id}`} onClick={handleClose}>{user.fullname}</Link>
                        </div>
                        <div>
                            {
                                user._id !== auth.user._id &&
                                <Button variant="outlined" className={classes.modal_body_user_button} onClick={() => handleFollow(user._id)}>
                                    {stateFollow.loading && stateFollow.id === user._id ? <CircularProgress /> : isFollowed(user._id) ? "Hủy theo dõi" : "Theo dõi"}
                                </Button>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { follow, unfollow } from "../../redux/callApi/userCall";
import { modalListStyles } from "../../style";


export default function UserList(props) {

    const { title, listUser, handleClose } = props;
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [followings, setFollowings] = useState([]);

    const classes = modalListStyles();

    const handleFollow = (user) => {
        // console.log(user);
        if (isFollowed(user._id)) {
            dispatch(unfollow(user, auth.token));
        }
        else {
            dispatch(follow(user, auth.token));
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
                <h2 className={classes.modal_header_left}>{title}</h2>
                <div className={classes.modal_header_right}>
                    <IconButton>
                        <Close className={classes.modal_header_closeIcon} onClick={handleClose} />
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
                                <Button variant="outlined" className={classes.modal_body_user_button} onClick={() => handleFollow(user)}>
                                    {isFollowed(user._id) ? "Hủy theo dõi" : "Theo dõi"}
                                </Button>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
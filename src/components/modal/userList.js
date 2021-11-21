import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { useSelector } from 'react-redux';

import { modalListStyles } from "../../style";


export default function UserList(props) {

    const { title, listUser, handleClose } = props;
    const { auth } = useSelector(state => state);
    const followings = auth.user.followings;

    const classes = modalListStyles();

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
                        <div className={classes.fullname}>{user.fullname}  </div>
                        <div>
                            {
                                user._id !== auth.user._id &&
                                <Button variant="outlined" className={classes.modal_body_user_button}>
                                    {followings.includes(user._id) ? "Unfollow" : "Follow"}
                                </Button>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { notificationStyles } from "../../style";

export default function NotificationItem(props) {

    const classes = notificationStyles();

    return (
        <Link button to="/">
            <ListItem className={props.noti.isSeen ? classes.itemContainer : [classes.itemContainer, classes.unSeen]}>
                <ListItemAvatar>
                    <Avatar
                        alt="avatar"
                    />
                </ListItemAvatar>
                <ListItemText>{props.noti.content}</ListItemText>
            </ListItem>
        </Link>
    )
}
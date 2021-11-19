import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { notificationStyles } from "../../style";

export default function NotificationItem(props) {

    const { noti } = props;

    const classes = notificationStyles();

    return (
        <Link button to="/">
            <ListItem className={noti.isSeen ? classes.itemContainer : [classes.itemContainer, classes.unSeen]}>
                <ListItemAvatar>
                    <Avatar
                        alt="avatar"
                    />
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant="caption">
                        {noti.time}
                    </Typography>
                    <Typography variant="body1">
                        {noti.content}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
    )
}
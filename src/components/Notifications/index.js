import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isSeenNotify } from "../../redux/callApi/notifyCall";

import { notificationStyles } from "../../style";
import { timeAgo } from '../../utils/date'

export default function NotificationItem(props) {

    const history = useHistory();

    const { noti } = props;

    const { auth } = useSelector(state => state)

    const dispatch = useDispatch();

    const classes = notificationStyles();

    const handleIsRead = (msg) => {
        dispatch(isSeenNotify(msg, auth.token))
    }

    const notiClick = () => {
        history.push(`${noti.url}`)
        handleIsRead(noti)
    }
    const isSeen = (notify) => {
        return notify.seen.find(item => item.id_recipient === auth.user._id)?.isSeen;
    }

    return (

        <ListItem className={isSeen(noti) ? classes.itemContainer : classes.unSeen} onClick={notiClick}>
            <ListItemAvatar>
                <Avatar className={classes.avatar} alt="avatar" src={noti.user.avatar} />
            </ListItemAvatar>
            <ListItemText>
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p className={classes.content}><strong className={classes.fullname}>{noti.user.fullname}</strong>{noti.text} : {noti.content.length > 20 ? noti.content.slice(0, 20) : noti.content} </p>
                    </div>
                    <div>
                        <span className={classes.timeAgo}>{timeAgo(new Date(noti.createdAt))}</span>
                    </div>
                </div>
            </ListItemText>
        </ListItem>

    )
}
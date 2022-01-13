import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isSeenNotify } from "../../redux/callApi/notifyCall";

import { notificationStyles } from "../../style";
import { timeAgo } from '../../utils/date'

export default function NotificationItem(props) {

    const history = useHistory();

    const { noti } = props;

    const { token } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const classes = notificationStyles();

    const handleIsRead = (msg) => {
        dispatch(isSeenNotify(msg, token))
    }

    return (

        <ListItem className={noti.seen ? classes.itemContainer : classes.unSeen} onClick={() => {
            history.push(`${noti.url}`)
            handleIsRead(noti)
        }}>
            <ListItemAvatar>
                <Avatar className={classes.avatar} alt="avatar" src={noti.user.avatar} />
            </ListItemAvatar>
            <ListItemText>
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <strong style={{ marginRight: "5px" }}>{noti.user.fullname}</strong>
                        <p>{noti.text} : {noti.content.length > 20 ? noti.content.slice(0, 20) : noti.content} </p>
                    </div>
                    <div>
                        <span style={{ color: "#34495e" }}>{timeAgo(new Date(noti.createdAt))}</span>
                    </div>
                </div>
                {
                    !noti.seen && <FiberManualRecord style={{ color: "#34495e" }} />
                }
            </ListItemText>
        </ListItem>

    )
}
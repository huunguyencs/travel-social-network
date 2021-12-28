import { Box, Container, List } from "@material-ui/core";
import React, { useEffect } from "react";

import NotificationItem from "../components/notifications/notification";
import { notificationStyles } from "../style";


const listNoti = [
    {
        _id: 465,
        isSeen: false,
        content: "Thông báo 1",
        time: "4/11/2021"
    },
    {
        _id: 467,
        isSeen: false,
        content: "Thông báo 2",
        time: "4/11/2021",
    },
    {
        _id: 4,
        isSeen: true,
        content: "Thông báo 3",
        time: "3/11/2021",
    },
    {
        _id: 46,
        isSeen: true,
        content: "Thông báo 4",
        time: "3/11/2021",
    },
    {
        _id: 479,
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        _id: 879,
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        _id: 5,
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        _id: 4895,
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        _id: 4798,
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        _id: 123,
        isSeen: true,
        content: "Thông báo 5",
        time: "1/11/2021",
    },
    {
        _id: 783,
        isSeen: true,
        content: "Thông báo 5",
        time: "1/11/2021",
    },

]


export default function NotificationPage(props) {

    const classes = notificationStyles();

    useEffect(() => {
        document.title = "Thông báo";
    })


    return (
        <Box className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Box flex={1} overflow="auto">
                <Container className={classes.fixWidth}>
                    <List className={classes.list}>
                        {listNoti.map((item) => (
                            <NotificationItem noti={item} key={item._id} />
                        ))}
                    </List>
                </Container>
            </Box>
        </Box>
    )
}
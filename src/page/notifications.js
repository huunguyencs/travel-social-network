import { Box, Container, List } from "@material-ui/core";
import React from "react";
import NotificationItem from "../components/notifications/notification";

import { notificationStyles } from "../style";


const listNoti = [
    {
        isSeen: false,
        content: "Thông báo 1",
        time: "4/11/2021"
    },
    {
        isSeen: false,
        content: "Thông báo 2",
        time: "4/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 3",
        time: "3/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 4",
        time: "3/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "2/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "1/11/2021",
    },
    {
        isSeen: true,
        content: "Thông báo 5",
        time: "1/11/2021",
    },

]


export default function NotificationPage(props) {

    const classes = notificationStyles();


    return (
        <Box className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Box flex={1} overflow="auto">
                <Container className={classes.fixWidth}>
                    <List className={classes.list}>
                        {listNoti.map((item) => (
                            <NotificationItem noti={item} />
                        ))}
                    </List>
                </Container>
            </Box>
        </Box>
    )
}
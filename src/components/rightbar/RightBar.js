import React from "react";
import {
    Container,
} from "@material-ui/core";

import Calendar from '../card/CalendarCard';
import { rightbarStyles } from "../../style";
import FriendRecommendCard from "../card/FriendRecommend";

export default function RightBar(props) {
    const classes = rightbarStyles();

    return (
        <Container className={classes.container}>
            <Calendar />
            <FriendRecommendCard />
        </Container>

    )
}
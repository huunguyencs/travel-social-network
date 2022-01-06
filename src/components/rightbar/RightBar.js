import React from "react";
import {
    Container,
} from "@material-ui/core";


import { rightbarStyles } from "../../style";


export default function RightBar(props) {
    const classes = rightbarStyles();

    return (
        <Container className={classes.container}>
            {props?.children}
        </Container>

    )
}
import React from "react";
import { Container } from "@material-ui/core";


import { leftbarStyles } from "../../style";

export default function LeftBar(props) {

    const classes = leftbarStyles();

    return (
        <Container className={classes.container} elevation={15}>
            {props.children}
        </Container>

    )
}
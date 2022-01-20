import React from "react";
import { Container } from "@material-ui/core";

import { leftbarStyles } from "../../style";
import Menu from "./menu";

export default function LeftBar({ menuList }) {

    const classes = leftbarStyles();

    return (
        <Container className={classes.container} elevation={15}>
            <Menu menuList={menuList} />
        </Container>
    )
}
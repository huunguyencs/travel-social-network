import { Typography } from "@material-ui/core";
import React from "react";

import Header from "../components/header/Header";
import useStyles from "../style";

export default function NotFound() {

    const classes = useStyles();

    return (
        <>
            <Header />
            <div className={classes.notFoundContainer}>
                <Typography variant="h1" style={{ paddingTop: 350 }}>Oops :(</Typography>
                <Typography variant="h2">404 Not Found!</Typography>
            </div>
        </>
    )
}
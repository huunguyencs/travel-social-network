import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import useStyles from "../style";

export default function NotFound() {

    const classes = useStyles();

    return (
        <>
            <Header />
            <div className={classes.notFoundContainer}>
                <Typography variant="h1" style={{ paddingTop: 350 }}>404!</Typography>
                <Typography variant="h2" style={{ paddingBottom: 30 }}>Trang không tồn tại</Typography>
                <Link to="/">Quay lại trang chủ</Link>
            </div>
        </>
    )
}
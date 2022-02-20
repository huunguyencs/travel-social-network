import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { modalStyles } from "../../style";

export default function LoginModal(props) {

    const classes = modalStyles();

    return (
        <Paper className={classes.loginContainer}>
            <Typography variant="h5" className={classes.loginTitle}>
                Bạn cần phải đăng nhập
            </Typography>
            <div className={classes.centerMarginTop}>
                <Link to="/login" className={classes.link}>
                    Đi đến trang đăng nhập
                </Link>
            </div>
            <div className={classes.centerMarginTop}>
                <Link to="/register" className={classes.link}>
                    Đăng ký
                </Link>
            </div>
        </Paper>
    )
}
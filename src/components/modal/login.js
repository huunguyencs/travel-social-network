import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function LoginModal(props) {
    return (
        <Paper>
            <Typography>
                <Link to="/login">
                    Bạn cần phải đăng nhập
                </Link>
            </Typography>
        </Paper>
    )
}
import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function LoginModal(props) {
    return (
        <Paper style={{ paddingInline: "30px", paddingBlock: "20px" }}>
            <Typography>
                Bạn cần phải đăng nhập
            </Typography>
            <div>
                <Link to="/login">
                    Đi đến trang đăng nhập
                </Link>
            </div>
        </Paper>
    )
}
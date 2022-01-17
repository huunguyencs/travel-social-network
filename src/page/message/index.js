import { Typography, Grid } from "@material-ui/core";
import React from "react";
import Header from "../../components/header/Header";
import { messageStyles } from "../../style";
import Conversations from "../../components/message/conversations";

export default function Message(props) {
    const classes = messageStyles();

    return (
        <div>
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
               <Conversations/>
                <Grid item sm={8}>
                    <div className={classes.startChat}>
                        <Typography variant="h5">
                            Bắt đầu trò chuyện
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
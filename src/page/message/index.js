import { Typography, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { messageStyles } from "../../style";
import Conversations from "../../components/Message/Conversations";

export default function Message(props) {
    const classes = messageStyles();

    const { token } = useSelector(state => state.auth);
    const history = useHistory();

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token, history])

    return (
        <div>
            {token &&
                <Grid container style={{ margin: 0, padding: 0 }}>
                    <Conversations />
                    <Grid item sm={8}>
                        <div className={classes.startChat}>
                            <Typography variant="h5">
                                Bắt đầu trò chuyện
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            }

        </div>
    )
}
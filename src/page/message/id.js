import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import Conversations from "../../components/Message/Conversations";
import Chat from "../../components/Message/Chat";

export default function Conversation(props) {

    const { token } = useSelector(state => state.auth);
    const history = useHistory();

    useEffect(() => {
        if (!token) {
            history.push("/login")
        }
    }, [token, history])

    return (
        <div>
            {token &&
                <Grid container style={{ margin: 0, padding: 0 }}>
                    <Conversations />
                    <Chat />
                </Grid>
            }

        </div>


    )
}
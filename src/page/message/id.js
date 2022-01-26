import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import Header from "../../components/header/Header";
import Conversations from "../../components/message/conversations";
import Chat from "../../components/message/chat";

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
            <Header />
            {token &&
                <Grid container style={{ margin: 0, padding: 0 }}>
                    <Conversations />
                    <Chat />
                </Grid>
            }

        </div>


    )
}
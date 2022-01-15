import { Grid} from "@material-ui/core";
import React from "react";
import Header from "../../components/header/Header";
import Conversations from "../../components/message/conversations";
import  Chat  from "../../components/message/chat";

export default function Conversation(props) {
    return (
        <div>
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
                <Conversations />
                <Chat/>
            </Grid>
        </div>


    )
}
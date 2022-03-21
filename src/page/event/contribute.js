import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import FormEventAdmin from "../../components/Admin/Event/Form";

import LeftBar from "../../components/Leftbar";
import { homeMenu } from "../../constant/menu";

export default function EventContribute() {
    const [event, setEvent] = useState({
        name: '',
        fullname: '',
        provinceId: null,
        time: null,
        calendarType: false,
        timedes: '',
        description: '',
        images: []
    })


    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={homeMenu}></LeftBar>
            </Grid>
            <Grid item md={9}>
                <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
                    <FormEventAdmin event={event} setEvent={setEvent} mode='contribute' />
                </Paper>
            </Grid>
        </Grid>

    );
}

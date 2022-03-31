import React, { useState } from "react";
import { Container, Paper } from "@material-ui/core";
import FormEventAdmin from "../../components/Admin/Event/Form";

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

        <Container>
            <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
                <FormEventAdmin event={event} setEvent={setEvent} mode='contribute' />
            </Paper>
        </Container>

    );
}

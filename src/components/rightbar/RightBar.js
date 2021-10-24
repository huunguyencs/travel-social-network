import { Container, makeStyles, Typography } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
    }
}));

export default function RightBar(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography>Right Bar</Typography>
        </Container>
    )
}
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        color: 'white',
        padding: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        position: "sticky",
        marginTop: theme.spacing(10),
        borderRadius: 20,
        top: 0,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    text: {
        fontWeight: 500,
    },
}));

export default function LeftBar(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>Trang chủ</Typography>
            </div>
            <div className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>Trang chủ</Typography>
            </div>
            <div className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>Trang chủ</Typography>
            </div>
        </Container>
    )
}
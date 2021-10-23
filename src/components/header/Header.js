import React from "react";
import { Typography, AppBar, Toolbar, InputBase, Avatar, Badge, makeStyles, alpha } from "@material-ui/core";
import { Search, Notifications, WhatsApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: 15,
        width: "40%",
        padding: 3,
    },
    searchIcon: {
        marginLeft: 10,
    },
    input: {
        color: "white",
        marginLeft: theme.spacing(1),
    },
    icons: {
        alignItems: "center",
        display: "flex",
    },
    badge: {
        marginRight: theme.spacing(3),
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    user: {
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(5),
    },
}));

export default function Header(props) {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">
                    GOGO
                </Typography>
                <div className={classes.search}>
                    <Search className={classes.searchIcon} />
                    <InputBase placeholder="Search ..." className={classes.input} />
                </div>
                <div className={classes.icons}>
                    <div class={classes.user}>
                        <Avatar className={classes.avatar} alt="avatar" src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                        <Typography>Trần Văn A</Typography>

                    </div>
                    <Badge className={classes.badge} color="secondary">
                        <Notifications />
                    </Badge>
                    <Badge className={classes.badge} color="secondary">
                        <WhatsApp />
                    </Badge>
                </div>
            </Toolbar>
        </AppBar>
    )
}
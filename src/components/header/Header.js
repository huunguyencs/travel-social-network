import React, { useState } from "react";
import { Typography, AppBar, Toolbar, InputBase, Avatar, Badge, makeStyles, alpha, IconButton } from "@material-ui/core";
import { Search, Notifications, WhatsApp, Cancel } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#57606F",
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha("#000", 0.15),
        "&:hover": {
            backgroundColor: alpha("#000", 0.25)
        },
        borderRadius: 15,
        width: "40%",
        padding: 3,
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "flex" : "none"),
            width: "70%",
            marginLeft: 10,
        }
    },
    searchIcon: {
        marginLeft: 10,
    },
    input: {
        width: "100%",
        color: "white",
        marginLeft: theme.spacing(1),
    },
    icons: {
        alignItems: "center",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "none" : "flex"),
        }
    },
    badge: {
        marginRight: theme.spacing(3),
        cursor: "pointer",
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    user: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(5),
    },
    userName: {
        fontSize: 18,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    searchButton: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "none" : "flex"),
            color: "white",
        }
    },
    cancel: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "flex" : "none"),
        }
    },
}));

export default function Header(props) {

    const [open, setOpen] = useState(false);

    const classes = useStyles({ open });

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">
                    GOGO
                </Typography>

                <div className={classes.search}>
                    <Search className={classes.searchIcon} />
                    <InputBase placeholder="Tìm kiếm ..." className={classes.input} />
                    <Cancel className={classes.cancel} onClick={(e) => setOpen(false)} />
                </div>
                <div>
                    <IconButton onClick={(e) => setOpen(true)}>
                        <Search className={classes.searchButton} />
                    </IconButton>
                </div>
                <div className={classes.icons}>
                    <div class={classes.user}>
                        <Avatar className={classes.avatar} alt="avatar" src="" />
                        <Typography className={classes.userName}>Trần Văn A</Typography>

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
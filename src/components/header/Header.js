import React from "react";
import { Typography, AppBar, Toolbar, InputBase, Avatar, Badge, makeStyles, alpha } from "@material-ui/core";
import { Search, Notifications, WhatsApp } from "@material-ui/icons";

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
    }
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
                    <InputBase placeholder="Tìm kiếm ..." className={classes.input} />
                </div>
                <div className={classes.icons}>
                    <div class={classes.user}>
                        <Avatar className={classes.avatar} alt="avatar" src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
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
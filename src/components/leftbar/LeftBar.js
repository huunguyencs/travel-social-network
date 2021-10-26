import { Container, makeStyles, ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import { Accessibility, ExpandMore, Explore, Home } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({

    container: {
        color: '#2F3542',
        paddingTop: theme.spacing(10),
        position: "sticky",
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        top: 0,
    },
    panel: {
        backgroundColor: "#EEF6F3",
        borderRadius: 20,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingInline: theme.spacing(1.5),

    },
    item: {
        paddingInline: theme.spacing(4),
        borderRadius: 20,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: "#A5DEC8",
        },
    },
    itemActive: {
        backgroundColor: "#A5DEC8",
    },
    icon: {
        color: "#2F3542",
    },
    text: {
        fontSize: '1.2em',
        fontWeight: 500,
    }
}));

export default function LeftBar(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container} elevation={15}>
            <List className={classes.panel}>
                <ListItem button className={[classes.item, classes.itemActive]}>
                    <ListItemIcon>
                        <Home className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Trang chủ"
                        classes={{ primary: classes.text }}
                    />
                </ListItem>
                <ListItem button className={classes.item}>
                    <ListItemIcon>
                        <Explore className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Hành trình"
                        classes={{ primary: classes.text }}
                    />
                </ListItem>
                <ListItem button className={classes.item}>
                    <ListItemIcon>
                        <Accessibility className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Dịch vụ"
                        classes={{ primary: classes.text }}
                    />
                </ListItem>
                <ListItem button className={classes.item}>
                    <ListItemIcon>
                        <ExpandMore className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Xem thêm"
                        classes={{ primary: classes.text }}
                    />
                </ListItem>
            </List>
        </Container>

    )
}
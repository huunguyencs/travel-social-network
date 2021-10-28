import { Container, makeStyles, ListItem, List, ListItemIcon, ListItemText, Collapse, Link } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";

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
        [theme.breakpoints.down("xs")]: {
            padding: 0,
        }

    },
    item: {
        paddingInline: theme.spacing(4),
        borderRadius: 20,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: "#A5DEC8",
        },
        [theme.breakpoints.down("xs")]: {
            paddingInline: 10,
        },
        [theme.breakpoints.down("md")]: {
            paddingInline: 8,
        },
        [theme.breakpoints.down("sm")]: {
            paddingInline: 0,
        },
    },
    itemActive: {
        backgroundColor: "#A5DEC8",

    },
    icon: {
        color: "#2F3542",
        marginInline: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            marginInline: 2,
        },
        [theme.breakpoints.down("xs")]: {
            marginInline: 5,
        }
    },
    text: {
        fontSize: '1.2em',
        fontWeight: 500,
        color: "#2F3542",
        [theme.breakpoints.down("xs")]: {
            display: "none",
        }
    },
}));

export default function LeftBar(props) {

    const [more, setMore] = useState(false);
    const classes = useStyles({ more });

    return (
        <Container className={classes.container} elevation={15}>
            <List className={classes.panel}>
                {props.menuList.slice(0, 3).map((item) => (
                    <Link style={{ textDecoration: "none", }}>
                        <ListItem button className={item.active ? [classes.item, classes.itemActive] : classes.item}>
                            <ListItemIcon>
                                {<item.icon className={classes.icon} />}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                classes={{ primary: classes.text }}
                            />
                        </ListItem>
                    </Link>
                ))}
                <Collapse in={more}>
                    {props.menuList.slice(3).map((item) => (
                        <Link style={{ textDecoration: "none", }}>
                            <ListItem button className={item.active ? [classes.item, classes.itemActive] : classes.item}>
                                <ListItemIcon>
                                    {<item.icon className={classes.icon} />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    classes={{ primary: classes.text }}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </Collapse>
                <ListItem button className={classes.item} onClick={() => setMore(!more)}>
                    <ListItemIcon>
                        {more ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
                    </ListItemIcon>
                    <ListItemText
                        primary={more ? "Thu gọn" : "Xem thêm"}
                        classes={{ primary: classes.text }}
                    />
                </ListItem>
            </List>
        </Container>

    )
}
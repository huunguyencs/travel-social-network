import { AppBar, Avatar, Badge, Button, Collapse, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { ChevronLeft, ExpandLess, ExpandMore, Menu, Notifications } from '@material-ui/icons';
import React, { useState } from "react";
import clsx from 'clsx';

import { mainListItems, secondaryListItems } from "../../constant/adminMenu";
import AdminHome from "./home";
import useStyles from "../../style/admin";

export default function Admin(props) {
    const [open, setOpen] = useState(true);
    const [more, setMore] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <Button style={{ display: "flex" }}>
                        <Avatar alt="avatar" />
                        <Typography style={{ color: "white", marginRight: 20, marginLeft: 10 }}>Admin</Typography>
                    </Button>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {mainListItems.map((item) => (
                        <ListItem button>
                            <ListItemIcon>
                                {<item.icon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <Collapse in={more}>
                        {secondaryListItems.map((item) => (
                            <ListItem button>
                                <ListItemIcon>
                                    {<item.icon />}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </Collapse>
                    <ListItem button onClick={() => setMore(!more)}>
                        <ListItemIcon>
                            {more ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                        <ListItemText primary={more ? "Thu gọn" : "Nâng cao"} />
                    </ListItem>
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <AdminHome />

            </main>
        </div>
    );
}
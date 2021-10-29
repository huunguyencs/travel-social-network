import React, { useState } from "react";
import {
    Typography,
    AppBar,
    Toolbar,
    InputBase,
    Avatar,
    Badge,
    IconButton
} from "@material-ui/core";
import {
    Search,
    Notifications,
    WhatsApp,
    Cancel
} from "@material-ui/icons";

import { headerStyles } from "../../style";

export default function Header(props) {

    const [open, setOpen] = useState(false);

    const classes = headerStyles({ open });

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
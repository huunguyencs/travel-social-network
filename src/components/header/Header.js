import React, { useState } from "react";
import {
    Typography,
    AppBar,
    Toolbar,
    InputBase,
    Avatar,
    IconButton,
    Button,
    Popover,
    Grow,
    MenuList,
    MenuItem,
    ClickAwayListener
} from "@material-ui/core";
import {
    Search,
    Notifications,
    WhatsApp,
    Cancel
} from "@material-ui/icons";

import { headerStyles } from "../../style";
import { Link } from "react-router-dom";

export default function Header(props) {

    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(null);

    const handleToggle = (e) => {
        setToggle(e.currentTarget);
    }

    const handleClose = (e) => {
        setToggle(null);
    }

    const classes = headerStyles({ open });

    const temp = true;

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Link to="/">
                    <Typography variant="h6" style={{ color: "#fff" }}>
                        GOGO
                    </Typography>
                </Link>

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
                    {
                        temp ? (
                            <>
                                <div class={classes.user}>
                                    <Button className={classes.button} onClick={handleToggle}>
                                        <Avatar className={classes.avatar} alt="avatar" src="" />
                                        <Typography className={classes.userName}>Trần Văn A</Typography>
                                    </Button>
                                    <Popover
                                        open={Boolean(toggle)}
                                        anchorEl={toggle}
                                        onClose={handleClose}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left"
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left",
                                        }}
                                    >
                                        <Grow
                                            style={{ transformOrigin: 'center bottom' }}
                                        >
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={toggle}>
                                                    <MenuItem aria-label="profile-post" component={Link} to="/profile/posts">Trang cá nhân</MenuItem>
                                                    <MenuItem>Thay đổi mật khẩu</MenuItem>
                                                    <MenuItem>Đăng xuất</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Grow>
                                    </Popover>
                                </div>
                                <IconButton className={classes.badge} aria-label="notifications" component={Link} to="/notifications">
                                    <Notifications />
                                </IconButton>
                                <IconButton className={classes.badge} aria-label="messages" component={Link} to="/message">
                                    <WhatsApp />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Button className={classes.button}>
                                    <Link to='/login' style={{ color: "white" }}>Đăng nhập</Link>
                                </Button>
                                <Button className={classes.button}>
                                    <Link to='/register' style={{ color: "white" }}>Đăng ký</Link>
                                </Button>
                            </>
                        )
                    }

                </div>
            </Toolbar>
        </AppBar>
    )
}
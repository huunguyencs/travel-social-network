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
    ClickAwayListener,
    Badge,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import {
    Search,
    Notifications,
    WhatsApp,
    Cancel
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headerStyles } from "../../style";
import { logout } from "../../redux/callApi/authCall";





export default function Header(props) {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [toggleMenuUser, setToggleMenuUser] = useState(null);
    const [toggleNoti, setToggleNoti] = useState(null);

    const handleToggleUser = (e) => {
        setToggleMenuUser(e.currentTarget);
    }

    const handleCloseUser = (e) => {
        setToggleMenuUser(null);
    }

    const handleToggleNoti = (e) => {
        setToggleNoti(e.currentTarget);
    }

    const handleCloseNoti = (e) => {
        setToggleNoti(null);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const classes = headerStyles({ open });


    return (
        <AppBar positionSticky style={{ zIndex: 1 }}>
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
                        auth.token ? (
                            <>
                                <div class={classes.user}>
                                    <Button className={classes.button} onClick={handleToggleUser} controls={toggleMenuUser ? "user-menu" : undefined}>
                                        <Avatar className={classes.avatar} alt="avatar" src="" />
                                        <Typography className={classes.userName}>Trần Văn A</Typography>
                                    </Button>
                                    <Popover
                                        open={Boolean(toggleMenuUser)}
                                        anchorEl={toggleMenuUser}
                                        onClose={handleCloseUser}
                                        // arial
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left"
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                    >
                                        <Grow
                                            style={{ transformOrigin: 'center bottom' }}
                                        >
                                            <ClickAwayListener onClickAway={handleCloseUser}>
                                                <MenuList autoFocusItem={toggleMenuUser} id="user-menu">
                                                    <MenuItem aria-label="profile-post" component={Link} to="/profile/465/" onClick={handleCloseUser}>Trang cá nhân</MenuItem>
                                                    <MenuItem onClick={handleCloseUser}>Thay đổi mật khẩu</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Grow>
                                    </Popover>
                                </div>
                                <IconButton className={classes.badge} aria-label="notifications">
                                    <Badge badgeContent={2} color="secondary" onClick={handleToggleNoti}>
                                        <Notifications />
                                    </Badge>
                                    <Popover
                                        open={Boolean(toggleNoti)}
                                        anchorEl={toggleNoti}
                                        onClose={handleCloseNoti}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left"
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "end",
                                        }}
                                    >
                                        <Grow
                                            style={{ transformOrigin: 'center bottom' }}
                                        >
                                            <ClickAwayListener onClickAway={handleCloseNoti}>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText>Thông báo 1Thông báo 1</ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>Thông báo 1</ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>Thông báo 1</ListItemText>
                                                    </ListItem>
                                                </List>
                                            </ClickAwayListener>
                                        </Grow>
                                    </Popover>
                                </IconButton>
                                <IconButton className={classes.badge} aria-label="messages" component={Link} to="/message">
                                    <Badge>
                                        <WhatsApp />
                                    </Badge>
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
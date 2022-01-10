import React, { useState } from "react";
import {
    Typography,
    AppBar,
    Toolbar,
    InputBase,
    Avatar,
    IconButton,
    Button,
    Popper,
    Grow,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Badge,
    Paper
} from "@material-ui/core";
import {
    Search,
    Notifications,
    WhatsApp,
    Cancel
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headerStyles } from "../../style";
import { logout } from "../../redux/callApi/authCall";





export default function Header(props) {

    const { auth } = useSelector(state => state);
    const user = auth.user;
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [toggleMenuUser, setToggleMenuUser] = useState(null);
    const [toggleNoti, setToggleNoti] = useState(null);
    const [search, setSearch] = useState("");

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
        history.push("/login");
    }

    const classes = headerStyles({ open });

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`/search?q=${search}`);
        // setSearch("");
        // console.log(search);
    }

    return (
        <AppBar style={{ zIndex: 1 }}>
            <Toolbar className={classes.toolbar}>
                <Link to="/">
                    <Typography variant="h6" className={classes.logo}>
                        GOGO
                    </Typography>
                </Link>

                <div className={classes.search}>
                    <Search className={classes.searchIcon} />
                    <form style={{ width: "100%" }} onSubmit={handleSearch}>
                        <InputBase placeholder="Tìm kiếm ..." className={classes.input} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <Cancel className={classes.cancel} onClick={(e) => setOpen(false)} />
                </div>
                <div>
                    <IconButton onClick={(e) => setOpen(true)} size="small">
                        <Search className={classes.searchButton} />
                    </IconButton>
                </div>
                <div className={classes.icons}>
                    {
                        auth.token ? (
                            <>
                                <div className={classes.user}>
                                    <Button className={classes.button} onClick={handleToggleUser} controls={toggleMenuUser ? "user-menu" : undefined}>
                                        <Avatar className={classes.avatar} alt="avatar" src={user.avatar} />
                                        <Typography noWrap={false} className={classes.userName}>{user.fullname}</Typography>
                                    </Button>
                                    <Popper

                                        open={Boolean(toggleMenuUser)}
                                        anchorEl={toggleMenuUser}
                                        onClose={handleCloseUser}
                                        disablePortal={true}
                                    // transformOrigin={{
                                    //     vertical: "top",
                                    //     horizontal: "left"
                                    // }}
                                    // anchorOrigin={{
                                    //     vertical: "bottom",
                                    //     horizontal: "center",
                                    // }}
                                    >
                                        <Grow
                                            className={classes.grow}
                                        >
                                            <ClickAwayListener onClickAway={handleCloseUser}>
                                                <Paper>
                                                    <MenuList autoFocusItem={Boolean(toggleMenuUser)} id="user-menu">
                                                        <MenuItem aria-label="profile" component={Link} to={`/profile/${user._id}/`} onClick={handleCloseUser}>Trang cá nhân</MenuItem>
                                                        <MenuItem aria-label="change-info" onClick={handleCloseUser} component={Link} to={'/change_info'}>Thay đổi thông tin</MenuItem>
                                                        <MenuItem aria-label="log-out" onClick={handleLogout}>Đăng xuất</MenuItem>
                                                    </MenuList>
                                                </Paper>
                                            </ClickAwayListener>
                                        </Grow>
                                    </Popper>
                                </div>
                                <IconButton className={classes.badge} aria-label="notifications" onClick={handleToggleNoti}>
                                    <Badge badgeContent={2} color="secondary">
                                        <Notifications />
                                    </Badge>
                                    <Popper
                                        open={Boolean(toggleNoti)}
                                        anchorEl={toggleNoti}
                                        onClose={handleCloseNoti}
                                        disablePortal={true}
                                    // transformOrigin={{
                                    //     vertical: "top",
                                    //     horizontal: "left"
                                    // }}
                                    // anchorOrigin={{
                                    //     vertical: "bottom",
                                    //     horizontal: "center",
                                    // }}
                                    >
                                        <Grow
                                            className={classes.grow}
                                        >

                                            <ClickAwayListener onClickAway={handleCloseNoti}>
                                                <Paper className={classes.paperNoti}>
                                                    <MenuList>
                                                        <MenuItem>Thông báo 1</MenuItem>
                                                        <MenuItem>Thông báo 2</MenuItem>
                                                        <MenuItem>Thông báo 3</MenuItem>
                                                        <MenuItem>Thông báo 4</MenuItem>
                                                    </MenuList>
                                                </Paper>
                                            </ClickAwayListener>

                                        </Grow>
                                    </Popper>
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
                                    <Link to='/login' className={classes.button}>Đăng nhập</Link>
                                </Button>
                                <Button className={classes.button}>
                                    <Link to='/register' className={classes.button}>Đăng ký</Link>
                                </Button>
                            </>
                        )
                    }

                </div>
            </Toolbar>
        </AppBar>
    )
}
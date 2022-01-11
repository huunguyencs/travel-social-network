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
    Paper,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core";
import {
    Search,
    Notifications,
    WhatsApp,
    Cancel,
    AddBox,
    FileCopy,
    Build,
    BubbleChart,
    FiberManualRecord
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headerStyles } from "../../style";
import { logout } from "../../redux/callApi/authCall";


const notifications = [
    { _id: 'drcfvgbh', userId: 'swefvg', content: 'Nguyễn Văn Hữu đã theo dõi bạn.', time: 'January 1, 1970 00:00:00', seen: 0, type: 'notify' },
    { _id: 'drcffffv', userId: 'swefvg', content: 'Nguyễn Văn Hữu đã đăng một bạn viết mới.', time: 'January 1, 1970 00:00:00', seen: 0, type: 'notify' },
    { _id: 'drrtrtyy', userId: 'swefvg', content: 'Hiện tại thành phố Bình Định tình hình covid đang bùng phát.', time: 'January 1, 1970 00:00:00', seen: 0, type: 'warning' },
    { _id: 'drcdfvgh', userId: 'swefvg', content: 'Bạn có một tin nhắn mới.', time: 'January 1, 1970 00:00:00', seen: 0, type: 'message' },
];


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
                    <Typography variant="h6" style={{ color: "#fff" }}>
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
                    <IconButton onClick={(e) => setOpen(true)}>
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
                                            style={{ transformOrigin: 'center bottom' }}
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

                                            <ClickAwayListener onClickAway={handleCloseNoti}>
                                                <Paper sx={{ width: 320, maxWidth: '100%' }}>
                                                    <MenuList>
                                                        <MenuItem>
                                                            <ListItemIcon>
                                                                <Build fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>Thông báo 1</ListItemText>
                                                            <Typography variant="body2" color="text.secondary"></Typography>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <ListItemIcon>
                                                                <FileCopy fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>Thông báo 2</ListItemText>
                                                            <Typography variant="body2">
                                                                <FiberManualRecord color="primary" fontSize="small" />
                                                            </Typography>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <ListItemIcon>
                                                                <BubbleChart fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>Thông báo 3</ListItemText>
                                                            <Typography variant="body2" color="text.secondary"></Typography>
                                                        </MenuItem>
                                                        <Divider />
                                                        <MenuItem>
                                                            <ListItemIcon>
                                                                <AddBox fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>Xem tất cả</ListItemText>
                                                        </MenuItem>
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
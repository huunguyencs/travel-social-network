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
    ListItemIcon
} from "@material-ui/core";
import {
    Search,
    Notifications,
    WhatsApp,
    Cancel,
    AccountCircle,
    Update,
    ExitToApp,
    SupervisorAccount,
    AccessibilityNew,
    Bookmark
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headerStyles } from "../../style";
import { logout } from "../../redux/callApi/authCall";
import { timeAgo } from '../../utils/date';
import { isSeenNotify, markAllRead } from '../../redux/callApi/notifyCall';


export default function Header(props) {

    const { auth, notify } = useSelector(state => state);
    const user = auth.user;
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [toggleMenuUser, setToggleMenuUser] = useState(null);
    const [toggleNoti, setToggleNoti] = useState(null);
    const openNoti = Boolean(toggleNoti)
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
    const handleIsRead = (msg) => {
        if (!isSeen(msg)) {
            dispatch(isSeenNotify(msg, auth.token))
        }
    }

    const calculateUnSeen = (notify) => {
        return notify.filter(item => !isSeen(item)).length;
    }

    const markAllReadClick = () => {
        console.log("remove");
        dispatch(markAllRead(auth.token, auth.user._id));
    }

    const isSeen = (notify) => {
        return notify.seen.find(item => item.id_recipient === auth.user._id)?.isSeen;
    }

    return (
        <AppBar style={{ zIndex: 2 }}>
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
                        user ? (
                            <>
                                <div className={classes.user} title={user.fullname}>
                                    <Button className={classes.button} onClick={handleToggleUser} controls={toggleMenuUser ? "user-menu" : undefined}>
                                        <Avatar component="span" className={classes.avatar} alt="avatar" src={user.avatar} />
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
                                                        {user.role === 2 &&
                                                            <MenuItem aria-label="admin" onClick={handleCloseUser} component={Link} to={'/admin'}>
                                                                <ListItemIcon>
                                                                    <SupervisorAccount fontSize="small" />
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">Trang quản trị</Typography>
                                                            </MenuItem>
                                                        }
                                                        {user.role === 1 &&
                                                            <MenuItem aria-label="admin" onClick={handleCloseUser} component={Link} to={'/addservice'}>
                                                                <ListItemIcon>
                                                                    <AccessibilityNew fontSize="small" />
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">Thêm dịch vụ</Typography>
                                                            </MenuItem>
                                                        }
                                                        <MenuItem aria-label="profile" component={Link} to={`/u/${user._id}`} onClick={handleCloseUser}>
                                                            <ListItemIcon>
                                                                <AccountCircle fontSize="small" />
                                                            </ListItemIcon>
                                                            <Typography variant="inherit">Trang cá nhân</Typography>
                                                        </MenuItem>
                                                        <MenuItem aria-label="change-info" onClick={handleCloseUser} component={Link} to={'/changeinfo'}>
                                                            <ListItemIcon>
                                                                <Update fontSize="small" />
                                                            </ListItemIcon>
                                                            <Typography variant="inherit">Thay đổi thông tin</Typography>
                                                        </MenuItem>
                                                        <MenuItem aria-label="profile" component={Link} to={`/saved`} onClick={handleCloseUser}>
                                                            <ListItemIcon>
                                                                <Bookmark fontSize="small" />
                                                            </ListItemIcon>
                                                            <Typography variant="inherit">Tour đã lưu</Typography>
                                                        </MenuItem>
                                                        <MenuItem aria-label="log-out" onClick={handleLogout}>
                                                            <ListItemIcon>
                                                                <ExitToApp fontSize="small" />
                                                            </ListItemIcon>
                                                            <Typography variant="inherit">Đăng xuất</Typography>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Paper>
                                            </ClickAwayListener>
                                        </Grow>
                                    </Popper>
                                </div>
                                <IconButton className={classes.badge} aria-label="notifications" onClick={handleToggleNoti} title="Thông báo">
                                    <Badge badgeContent={calculateUnSeen(notify.data)} color="secondary">
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                                <Popper
                                    open={openNoti}
                                    anchorEl={toggleNoti}
                                    onClose={handleCloseNoti}
                                    disablePortal={true}
                                >
                                    <Grow className={classes.grow} >
                                        <ClickAwayListener onClickAway={handleCloseNoti}>
                                            <Paper className={classes.paperNoti}>
                                                <div className={classes.notiHeader}>
                                                    <Typography className={classes.notiTitle} variant="h5">Thông báo</Typography>
                                                    <Typography onClick={markAllReadClick} className={classes.markAllRead}>Đánh dấu tất cả đã đọc</Typography>
                                                </div>
                                                <MenuList>
                                                    {notify.data.slice(0, 5).map((item) => (

                                                        <MenuItem key={item._id} className={isSeen(item) ? classes.notiItem : classes.unSeen} onClick={(e) => {
                                                            handleCloseNoti(e);
                                                            history.push(`${item.url}`)
                                                            handleIsRead(item)
                                                        }}>
                                                            <Avatar className={classes.avatar} alt="avatar" src={item.user.avatar} />

                                                            <div>
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <strong style={{ marginRight: "5px" }}>{item.user.fullname}</strong>
                                                                    <p>{item.text} : {item.content.length > 20 ? item.content.slice(0, 20) : item.content} </p>
                                                                </div>
                                                                <div>
                                                                    <span style={{ color: "#34495e" }}>{timeAgo(new Date(item.createdAt))}</span>
                                                                </div>
                                                            </div>
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>

                                                <div className={classes.center}>
                                                    {
                                                        notify.data.length === 0 ? <i>Không có thông báo</i> :
                                                            <Typography className={classes.seeAll} variant="body1" onClick={() => {
                                                                handleCloseNoti();
                                                                history.push('/notifications')
                                                            }}>
                                                                Xem tất cả
                                                            </Typography>
                                                    }

                                                </div>
                                            </Paper>
                                        </ClickAwayListener>

                                    </Grow>
                                </Popper>
                                <IconButton className={classes.badge} aria-label="messages" component={Link} to="/message" title="Tin nhắn">
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
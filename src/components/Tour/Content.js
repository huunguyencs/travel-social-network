import { Avatar, Backdrop, Button, CardContent, CardHeader, CardMedia, CircularProgress, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, Grow, IconButton, MenuItem, MenuList, Modal, Paper, Popper, Typography } from '@material-ui/core'
import { Bookmark, BookmarkBorder, MoreVert } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveTour, unsavedTour } from '../../redux/callApi/authCall'
import { deleteTour, joinTour, unJoinTour } from '../../redux/callApi/tourCall'


import { postStyles } from '../../style'
import { convertDateToStr, timeAgo } from '../../utils/date'
import ShareUpdateForm from '../Forms/UpdateShare'
import ImageModal from '../Modal/Image'
import ManageUserJoin from '../Modal/ManageUserJoin'
import UserList from '../Modal/UserList'
import { SeeMoreText } from '../SeeMoreText'

function ShareContent({ tour }) {

    const { auth, socket } = useSelector(state => state);
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const [anchorEl, setAnchorEl] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const dispatch = useDispatch();

    const handleShowMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleCloseEdit = () => {
        setShowEdit(false);
        handleCloseMenu();
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
        handleCloseMenu();
    }

    const [tourShare, setTourShare] = useState(tour.shareId);

    const handleDeleteTour = () => {
        setState({
            loading: true,
            error: false
        })
        dispatch(deleteTour(tour, auth.token, socket, () => {
            setState({
                loading: false,
                error: false
            })
            setShowDelete(false);
            handleCloseMenu();
        }, () => {
            setState({
                loading: false,
                error: true
            })
        }));

    }

    const handleShowEdit = () => {
        setShowEdit(true);
    }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const classes = postStyles();
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <>
                        {auth.user && auth.user._id === tour.userId._id &&
                            <>
                                <IconButton aria-label="settings" onClick={handleShowMenu} size='small'>
                                    <MoreVert />
                                </IconButton>
                                <Popper
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseMenu}
                                    disablePortal
                                >
                                    <Grow
                                        style={{ transformOrigin: "center bottom" }}
                                    >
                                        <ClickAwayListener onClickAway={handleCloseMenu}>
                                            <Paper>
                                                <MenuList>
                                                    <MenuItem onClick={handleShowEdit}>Chỉnh sửa bài viết</MenuItem>
                                                    <Modal
                                                        aria-labelledby="transition-modal-edit"
                                                        aria-describedby="transition-modal-edit-description"
                                                        open={showEdit}
                                                        className={classes.modal}
                                                        onClose={handleCloseEdit}
                                                        BackdropComponent={Backdrop}
                                                        BackdropProps={{
                                                            timeout: 500,
                                                        }}
                                                    >
                                                        <ShareUpdateForm object={tour} type={"tour"} handleClose={handleCloseEdit} />
                                                    </Modal>
                                                    <MenuItem onClick={handleShowDelete}>Xóa bài viết</MenuItem>
                                                    <Dialog
                                                        open={showDelete}
                                                        onClose={handleCloseDelete}
                                                        aria-labelledby="show-delete-dialog"
                                                        aria-describedby="show-delete-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>

                                                        <DialogContent>Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!</DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseDelete}>
                                                                Hủy
                                                            </Button>
                                                            <Button onClick={handleDeleteTour} className={classes.delete}>
                                                                {
                                                                    state.loading ? <CircularProgress size={15} color='inherit' /> : "Xóa"
                                                                }
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </MenuList>
                                            </Paper>
                                        </ClickAwayListener>
                                    </Grow>
                                </Popper>
                            </>
                        }

                    </>
                }
                title={
                    <Typography noWrap={false} className={classes.userName} component={Link} to={`/u/${tour.userId._id}`}>{tour.userId.fullname}</Typography>
                }
                subheader={
                    <Link to={`/tour/${tour._id}`} style={{ cursor: "pointer" }}>
                        {timeAgo(new Date(tour.createdAt))}
                    </Link>
                }
            />
            <CardContent>
                <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={tour.content}
                />

            </CardContent>
            <div className={classes.hashtagWrap}>
                {tour.hashtags.map((item, index) =>
                    <Typography className={classes.hashtag} key={index}>#{item}</Typography>
                )}
            </div>
            {tourShare ? <BaseContent tour={tourShare} setTour={setTourShare} share={true} /> : <Typography>Nội dung không còn tồn tại</Typography>}
        </>
    )
}

function BaseContent(props) {

    const { tour, setTour, share } = props;

    const isSaved = () => {
        if (auth.user && auth.user.tourSaved)
            return auth.user.tourSaved.includes(tour._id);
        return false;
    }

    const { auth, socket } = useSelector(state => state);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [state, setState] = useState({
        loadingDelete: false,
        loadingJoin: false,
        error: false
    })

    const dispatch = useDispatch();

    const handleShowMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
        handleCloseMenu();
    }


    const [join, setJoin] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);

    const classes = postStyles();

    const updateJoin = (joins) => {
        setTour({
            ...tour,
            joinIds: joins
        })
    }

    useEffect(() => {
        if (auth.user && tour.joinIds.find(join => join._id === auth.user._id)) {
            setJoin(true);
        }
    }, [tour, auth.user]);

    const handleJoin = async () => {
        setState({
            loadingJoin: true,
            error: false
        })
        setJoin(true);
        var prevJoin = tour.joinIds;
        updateJoin([...prevJoin, auth.user]);
        dispatch(joinTour(tour._id, auth.token, () => {
            setState({
                loadingJoin: false,
                error: false,
            })
        }, () => {
            setState({
                loadingJoin: false,
                error: true,
            })
            if (join) {
                setJoin(false);
                updateJoin(prevJoin);
            }
        }))
    }

    const handleUnJoin = () => {
        setState({
            loadingJoin: true,
            error: false,
        })
        setJoin(false);
        var prevJoin = tour.joinIds;
        var newJoin = prevJoin.filter(user => user._id !== auth.user._id);
        updateJoin(newJoin);

        dispatch(unJoinTour(tour._id, auth.token, () => {
            setState({
                loadingJoin: false,
                error: false,
            })
        }, () => {
            setState({
                loadingJoin: false,
                error: true,
            })
            if (!join) {
                setJoin(true);
                updateJoin(prevJoin);
            }
        }))
    }

    const handleShowJoin = () => {
        setOpenJoin(true);
    }

    const handleCloseJoin = () => {
        setOpenJoin(false);
    }

    const joinClick = () => {
        if (auth.user) {
            if (join) {
                handleUnJoin();
            }
            else handleJoin();
        }
    }

    const handleDeleteTour = () => {
        setState({
            loadingDelete: true,
            error: false
        })
        dispatch(deleteTour(tour, auth.token, socket, () => {
            setState({
                loadingDelete: false,
                error: false
            })
            setShowDelete(false);
            handleCloseMenu();
        }, () => {
            setState({
                loadingDelete: false,
                error: true
            })
        }))
    }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const handleOpenImage = () => {
        setOpen(true)
    }

    const handleCloseImage = () => {
        setOpen(false);
    }

    const handleSaveTour = () => {
        dispatch(saveTour(tour._id, auth.token))
        handleCloseMenu();
    }

    const handleUnSaveTour = () => {
        dispatch(unsavedTour(tour._id, auth.token));
        handleCloseMenu();
    }

    const [open, setOpen] = useState(false);
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleShowMenu} size='small'>
                            <MoreVert />
                        </IconButton>
                        <Popper
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleCloseMenu}
                            disablePortal
                        >
                            <Grow
                                style={{ transformOrigin: "center bottom" }}
                            >
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <Paper>
                                        <>
                                            {
                                                auth.user && auth.user._id === tour.userId._id && !share ?
                                                    <MenuList>
                                                        <MenuItem component={Link} to={`/tour/${tour._id}?edit=true`}>Chỉnh sửa hành trình</MenuItem>
                                                        <MenuItem onClick={handleShowDelete}>Xóa hành trình</MenuItem>
                                                        <Dialog
                                                            open={showDelete}
                                                            onClose={handleCloseDelete}
                                                            aria-labelledby="show-delete-dialog"
                                                            aria-describedby="show-delete-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                                            <DialogContent>Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!</DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleCloseDelete}>
                                                                    Hủy
                                                                </Button>
                                                                <Button onClick={handleDeleteTour} className={classes.delete}>
                                                                    {
                                                                        state.loadingDelete ? <CircularProgress color='inherit' size={15} /> : "Xóa"
                                                                    }
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </MenuList> :
                                                    <>
                                                        {
                                                            isSaved() ?
                                                                <MenuList>
                                                                    <MenuItem onClick={handleUnSaveTour}>
                                                                        <Bookmark fontSize="small" />
                                                                        Hành trình đã lưu
                                                                    </MenuItem>
                                                                </MenuList>
                                                                :
                                                                <MenuList>
                                                                    <MenuItem onClick={handleSaveTour}>
                                                                        <BookmarkBorder fontSize="small" />
                                                                        Lưu hành trình
                                                                    </MenuItem>
                                                                </MenuList>

                                                        }

                                                    </>
                                            }

                                        </>

                                    </Paper>
                                </ClickAwayListener>
                            </Grow>
                        </Popper>
                    </>

                }
                title={
                    <Typography noWrap={false} className={classes.userName} component={Link} to={`/u/${tour.userId._id}`}>{tour.userId.fullname}</Typography>
                }
                subheader={
                    <Link to={`/tour/${tour._id}`} className={classes.subheader}>
                        {timeAgo(new Date(tour.createdAt))}
                    </Link>
                }
            />
            {tour.image !== "" &&
                <CardMedia>
                    <img src={tour.image} className={classes.image} width="100%" alt="Can not load" onClick={handleOpenImage} />
                    <ImageModal
                        open={open}
                        handleClose={handleCloseImage}
                        img={tour.image}
                    />
                </CardMedia>
            }


            <CardContent>
                <div>
                    {new Date(tour.tour[0]?.date) > new Date() && tour.userId._id !== auth.user?._id &&
                        <Button onClick={joinClick}>{state.loadingJoin ? <CircularProgress size={18} color='inherit' /> : join ? "Rời khỏi tour" : "Tham gia tour"}</Button>

                    }
                </div>
                <Typography variant="h6" className={classes.title} component={Link} to={`/tour/${tour._id}`}>
                    {tour.name}
                </Typography>
                <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={tour.content}
                />
                <Typography style={{ marginTop: 5 }}>Địa điểm: {tour.provinces.join(", ")}</Typography>

                {tour.tour.length > 1 ?
                    <Typography style={{ marginTop: 5 }}>
                        Từ {convertDateToStr(tour.tour[0]?.date)} đến {convertDateToStr(tour.tour[tour.tour.length - 1]?.date)}
                    </Typography> :
                    <Typography>
                        Ngày {convertDateToStr(tour.tour[0]?.date)}
                    </Typography>
                }
                <Typography style={{ marginTop: 5 }}>
                    Chi phí: {new Intl.NumberFormat().format(tour.cost * 1000)} VND
                </Typography>
                <div>
                    <Typography>Thành viên tham gia:
                        <span className={classes.numLike} onClick={handleShowJoin} style={{ marginInline: 10 }}>
                            {tour.joinIds.length + 1}
                        </span>
                    </Typography>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openJoin}
                        onClose={handleCloseJoin}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        {auth.user && auth.user._id === tour.userId._id ?
                            <ManageUserJoin listUser={[tour.userId, ...tour.joinIds]} updateJoin={updateJoin} tourId={tour._id} title={"Thành viên tham gia"} handleClose={handleCloseJoin} /> :
                            <UserList listUser={[tour.userId, ...tour.joinIds]} title={"Thành viên tham gia"} handleClose={handleCloseJoin} />
                        }

                    </Modal>
                </div>

                <div className={classes.hashtagWrap}>
                    {tour.hashtags.map((item, index) =>
                        <Typography className={classes.hashtag} key={index}>#{item}</Typography>
                    )}
                </div>

            </CardContent>
        </>
    )
}

export default function TourContent({ tour, setTour }) {
    return (
        <>
            {tour && tour.shareId ? <ShareContent tour={tour} /> : <BaseContent tour={tour} setTour={setTour} share={false} />}
        </>
    )
}
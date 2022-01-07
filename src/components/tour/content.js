import { Avatar, Backdrop, Button, CardContent, CardHeader, CardMedia, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, Menu, MenuItem, Modal, Typography } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTour, joinTour, unJoinTour } from '../../redux/callApi/tourCall'


import { postStyles } from '../../style'
import { convertDateToStr, timeAgo } from '../../utils/date'
import ShareUpdateForm from '../forms/updateShare'
import ImageModal from '../modal/image'
import ManageUserJoin from '../modal/manageUserJoin'
import UserList from '../modal/userList'
import { SeeMoreText } from '../seeMoreText'

const MenuListProps = {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
}

function ShareContent({ tour }) {

    const { auth } = useSelector(state => state);
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
        dispatch(deleteTour(tour._id, auth.token, () => {
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

    const classes = postStyles();
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <>
                        {auth.user._id === tour.userId._id &&
                            <>
                                <IconButton aria-label="settings" onClick={handleShowMenu}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    disablePortal={true}
                                    MenuListProps={MenuListProps}
                                >
                                    <MenuItem onClick={() => setShowEdit(true)}>Chỉnh sửa bài viết</MenuItem>
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
                                    <MenuItem onClick={() => setShowDelete(true)}>Xóa bài viết</MenuItem>
                                    <Dialog
                                        open={showDelete}
                                        onClose={handleCloseDelete}
                                        aria-labelledby="show-delete-dialog"
                                        aria-describedby="show-delete-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleCloseDelete}>
                                                Hủy
                                            </Button>
                                            <Button onClick={handleDeleteTour}>
                                                Xóa
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </Menu>
                            </>
                        }

                    </>
                }
                title={
                    <Typography noWrap={false} className={classes.userName} component={Link} to={`/profile/${tour.userId._id}`}>{tour.userId.fullname}</Typography>
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
                    <Typography className={classes.hashtag} key={index}>{item}</Typography>
                )}
            </div>
            {tourShare ? <BaseContent tour={tourShare} setTour={setTourShare} share={true} /> : <Typography>Nội dung không còn tồn tại</Typography>}
        </>
    )
}

function BaseContent(props) {

    const { tour, setTour, share } = props;

    const { auth } = useSelector(state => state);

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
        if (tour?.joinIds.find(join => join._id === auth?.user._id)) {
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

    const joinClick = () => {
        if (join) {
            handleUnJoin();
        }
        else handleJoin();
    }

    const handleDeleteTour = () => {
        setState({
            loadingDelete: true,
            error: false
        })
        dispatch(deleteTour(tour._id, auth.token, () => {
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

    const [open, setOpen] = useState(false);
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <>
                        {auth.user._id === tour.userId._id && !share &&
                            <>
                                <IconButton aria-label="settings" onClick={handleShowMenu}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    disablePortal={true}
                                    MenuListProps={MenuListProps}
                                >
                                    <MenuItem component={Link} to={`/tour/${tour._id}?edit=true`}>Chỉnh sửa hành trình</MenuItem>
                                    <MenuItem onClick={() => setShowDelete(true)}>Xóa hành trình</MenuItem>
                                    <Dialog
                                        open={showDelete}
                                        onClose={handleCloseDelete}
                                        aria-labelledby="show-delete-dialog"
                                        aria-describedby="show-delete-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleCloseDelete}>
                                                Hủy
                                            </Button>
                                            <Button onClick={handleDeleteTour}>
                                                {
                                                    state.loadingDelete ? <CircularProgress /> : "Xóa"
                                                }
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </Menu>
                            </>
                        }

                    </>
                }
                title={
                    <Typography noWrap={false} className={classes.userName} component={Link} to={`/profile/${tour.userId._id}`}>{tour.userId.fullname}</Typography>
                }
                subheader={
                    <Link to={`/tour/${tour._id}`} style={{ cursor: "pointer" }}>
                        {timeAgo(new Date(tour.createdAt))}
                    </Link>
                }
            />
            {tour.image !== "" &&
                <CardMedia>
                    <img src={tour.image} className={classes.image} width="100%" alt="Can not load" onClick={() => setOpen(true)} />
                    <ImageModal
                        open={open}
                        handleClose={() => setOpen(false)}
                        img={tour.image}
                    />
                </CardMedia>
            }


            <CardContent>
                <div>
                    {new Date(tour.tour[0]?.date) > new Date() && tour.userId._id !== auth.user?._id &&
                        <Button onClick={joinClick}>{state.loadingJoin ? <CircularProgress /> : join ? "Rời khỏi tour" : "Tham gia tour"}</Button>

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
                <Typography style={{ marginTop: 20 }}>
                    Thời gian: {tour.tour?.length} ngày - Bắt đầu {convertDateToStr(tour.tour[0]?.date)}
                </Typography>
                <Typography style={{ marginTop: 20 }}>
                    Chi phí: {new Intl.NumberFormat().format(tour.cost * 1000)} VND
                </Typography>
                <div>
                    <Typography>Thành viên tham gia:
                        <span className={classes.numLike} onClick={() => setOpenJoin(true)} style={{ marginInline: 10 }}>
                            {tour.joinIds.length + 1}
                        </span>
                    </Typography>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openJoin}
                        onClose={() => setOpenJoin(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        {auth.user._id === tour.userId._id ?
                            <ManageUserJoin listUser={[tour.userId, ...tour.joinIds]} updateJoin={updateJoin} tourId={tour._id} title={"Thành viên tham gia"} handleClose={() => setOpenJoin(false)} /> :
                            <UserList listUser={[tour.userId, ...tour.joinIds]} title={"Thành viên tham gia"} handleClose={() => setOpenJoin(false)} />
                        }

                    </Modal>
                </div>

                <div className={classes.hashtagWrap}>
                    {tour.hashtags.map((item, index) =>
                        <Typography className={classes.hashtag} key={index}>{item}</Typography>
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

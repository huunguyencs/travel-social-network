import { Button, Card, CardContent, CardMedia, Grid, IconButton, InputBase, Modal, Typography, Backdrop, Fade, MenuItem, Dialog, DialogTitle, DialogActions, Popper, ClickAwayListener, Paper, MenuList, TextField, Collapse, CircularProgress, CardHeader, Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Close, MoreVert } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { tourdetailStyles } from "../../style";
import CreateReviewForm from "../Forms/CreateReview";
import EditLocationForm from "../Forms/EditLocation";
import * as tourAction from '../../redux/actions/createTourAction';
import { success } from "../../redux/actions/alertAction";
import customAxios from "../../utils/fetchData";
import { timeAgo } from "../../utils/date";
import { Rating } from "@material-ui/lab";
import { SeeMoreText } from "../SeeMoreText";
import ImageList from "../Modal/ImageList";


function ReviewList(props) {
    const { reviews, handleClose } = props;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getReview = async (reviews) => {
        setLoading(true);
        setError(false);
        try {
            await customAxios().post(`/post/post_list`, {
                list: reviews
            }).then(res => {
                setPosts(res.data.posts);
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
            setError(false);
        }
    }

    useEffect(() => {
        getReview(reviews)
    }, [reviews])

    return (
        <Paper style={{ width: 700 }}>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <IconButton size="small" onClick={handleClose}>
                    <Close />
                </IconButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h5' style={{ marginBottom: 20 }}>Review</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                    style={{
                        height: '60vh',
                        overflowY: 'auto',
                    }}
                >
                    {
                        loading &&
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                            <CircularProgress />
                        </div>
                    }
                    {
                        error &&
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                            <Typography>Có lỗi xảy ra</Typography>
                        </div>
                    }
                    {!error && posts.map(post =>
                        <Card style={{ width: 600, borderRadius: 10, border: '1px solid #ddd' }} key={post._id}>
                            <CardHeader
                                avatar={
                                    <Avatar alt='avatar' src={post.userId.avatar} />
                                }
                                title={
                                    <Typography style={{ fontWeight: 500 }} component={Link} to={`/u/${post.userId._id}`}>{post.userId.fullname}</Typography>
                                }
                                subheader={
                                    <Link to={`/post/${post._id}`}>
                                        {timeAgo(new Date(post.createdAt))}
                                    </Link>
                                }
                            />
                            {
                                post.images.length > 0 &&
                                <CardMedia>
                                    <ImageList imageList={post.images} show2Image={true} defaultHeight={300} />
                                </CardMedia>
                            }
                            <Rating name="location-rating" value={post.rate} readOnly style={{ marginBottom: 10, marginInline: 20 }} />
                            <CardContent style={{ marginInline: 10 }}>
                                <SeeMoreText
                                    variant="body1"
                                    maxText={100}
                                    text={post.content}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

        </Paper>
    )
}


function Detail(props) {

    const classes = tourdetailStyles();
    const dispatch = useDispatch();

    const { location, isEdit, indexDate, indexLocation } = props;

    const [description, setDescription] = useState(location.description);
    const [time, setTime] = useState(location.time);
    const [cost, setCost] = useState(location.cost);



    const handleUpdateInfo = () => {
        dispatch(tourAction.updateLocation({ cost: parseInt(cost), description: description, indexDate: indexDate, indexLocation: indexLocation, time: time }))
        dispatch(success({ message: 'Cập nhật thành công!' }))
    }

    return (
        <div style={{ padding: 15, paddingTop: 0 }}>
            {
                isEdit ?
                    <div>
                        <InputBase
                            placeholder="Mô tả"
                            title="Thông tin"
                            variant="outlined"
                            name="description"
                            id="description"
                            className={classes.descriptionInput}
                            multiline
                            rows={5}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Thời gian"
                            title="Thời gian"
                            variant="outlined"
                            name="time"
                            id="time"
                            className={classes.fullField}
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                        <TextField
                            label="Chi phí"
                            title="Chi phí"
                            variant="outlined"
                            name="cost"
                            id="cost"
                            type="number"
                            className={classes.fullField}
                            // className={classes.hashtag}
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                        <div className={classes.btnWrap}>
                            <Button onClick={handleUpdateInfo} variant="contained" color="primary">Cập nhật</Button>
                        </div>
                    </div> :
                    <div>
                        <Typography>Chi phí: {new Intl.NumberFormat().format(location.cost * 1000)} VND</Typography>
                        <Typography>Thời gian: {location.time}</Typography>
                        <Typography>Mô tả: {location.description}</Typography>
                    </div>
            }
        </div>
    )
}

export default function Location(props) {

    const classes = tourdetailStyles();

    // const { token } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const { location, isOwn, isEdit, isSave, tourDateId, indexDate, indexLocation, addReview } = props;

    const [showDetail, setShowDetail] = useState(false);
    const [showCreateRv, setShowCreateRv] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editLoc, setEditLoc] = useState(false);
    const [showDeleteLocation, setShowDeleteLocation] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const handleShowMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleShowEdit = () => {
        setEditLoc(true);
    }

    const handleCloseEdit = () => {
        setEditLoc(false);
        handleCloseMenu();
    }

    const handleShow = () => {
        setShowCreateRv(true);
    }

    const handleClose = () => {
        setShowCreateRv(false);
    }

    const handleShowDelete = () => {
        setShowDeleteLocation(true);
    }
    const handleCloseDelete = () => {
        setShowDeleteLocation(false);
    }

    const handleDeleteLocation = () => {
        dispatch(tourAction.deleteLocation({ indexDate: indexDate, indexLocation: indexLocation }));
        handleCloseDelete();
        handleCloseMenu();
    }

    const handleShowDetail = () => {
        setShowDetail(state => !state);
    }





    const handleShowReview = () => {
        setShowReview(true);
    }

    const handleCloseReview = () => {
        setShowReview(false);
    }

    const refEdit = React.createRef();
    const refCr = React.createRef();
    const ref = React.createRef();

    const EditLocationRef = React.forwardRef((props, ref) =>
        <EditLocationForm {...props} innerRef={ref} />
    )

    const CreateReviewRef = React.forwardRef((props, ref) =>
        <CreateReviewForm {...props} innerRef={ref} />
    )

    const ReviewRef = React.forwardRef((props, ref) =>
        <ReviewList {...props} innerRef={ref} />
    )

    return (
        <Card className={classes.cardContainer}>

            <Grid container>
                <Grid item md={5} sm={3} className={classes.imageLocation}>
                    <CardMedia className={classes.imgContainer}>
                        <img src={location.location.images[0]} alt="Đang tải..." className={classes.img} />
                    </CardMedia>

                </Grid>
                <Grid item md={7} sm={9} xs={12}>
                    <CardContent className={classes.contentContainer}>

                        <div className={classes.locationContentContainer}>
                            <div>
                                <div>
                                    <Typography variant="h5" className={classes.locationName} component={Link} to={`/location/${location.location.name}`}>{location.location.fullname}</Typography>
                                </div>
                                <div>
                                    <Typography variant="h6" component={Link} to={"/province/" + location.location.province.name}>{location.location.province.fullname}</Typography>
                                </div>
                                {
                                    isSave && isOwn && <div> <Button className={classes.reviewBtn} onClick={handleShow}>Tạo Review</Button> </div>
                                }
                                {
                                    isSave && location.postId?.length > 0 && <Button onClick={handleShowReview}>Xem review</Button>
                                }
                                <Button onClick={handleShowDetail}>Chi tiết</Button>
                            </div>
                            {isEdit &&
                                <div>
                                    <div className={classes.tourHeader}>
                                        <IconButton aria-label="settings" onClick={handleShowMenu} size="small">
                                            <MoreVert />
                                        </IconButton>
                                    </div>
                                    <Popper
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMenu}
                                        disablePortal
                                    >
                                        {/* <Grow
                                            style={{ transformOrigin: "center bottom" }}
                                        > */}
                                        <ClickAwayListener onClickAway={handleCloseMenu}>
                                            <Paper>
                                                <MenuList>
                                                    <MenuItem onClick={handleShowEdit}>
                                                        Chỉnh sửa
                                                    </MenuItem>
                                                    <Modal
                                                        aria-labelledby="transition-modal-edit"
                                                        aria-describedby="transition-modal-edit-description"
                                                        open={editLoc}
                                                        className={classes.modal}
                                                        onClose={handleCloseEdit}
                                                        BackdropComponent={Backdrop}
                                                        BackdropProps={{
                                                            timeout: 500,
                                                        }}
                                                    >
                                                        <Fade in={editLoc}>
                                                            <EditLocationRef
                                                                ref={refEdit}
                                                                handleCloseParent={handleCloseMenu}
                                                                handleClose={handleCloseEdit}
                                                                indexDate={indexDate}
                                                                indexLocation={indexLocation}
                                                                location={location}
                                                            />
                                                        </Fade>
                                                    </Modal>
                                                    <MenuItem onClick={handleShowDelete}>
                                                        Xóa
                                                    </MenuItem>
                                                    <Dialog
                                                        open={showDeleteLocation}
                                                        onClose={handleCloseDelete}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseDelete}>
                                                                Hủy
                                                            </Button>
                                                            <Button onClick={handleDeleteLocation} className={classes.delete}>
                                                                Xóa
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </MenuList>
                                            </Paper>
                                        </ClickAwayListener>
                                        {/* </Grow> */}
                                    </Popper>
                                </div>
                            }
                        </div>


                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={showCreateRv}
                            className={classes.modal}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={showCreateRv}>
                                <CreateReviewRef
                                    ref={refCr}
                                    location={location.location}
                                    cost={location.cost}
                                    handleClose={handleClose}
                                    tourDateId={tourDateId}
                                    indexLocation={location._id}
                                    addReview={addReview}
                                />
                            </Fade>
                        </Modal>
                        <Modal
                            aria-labelledby="transition-modal-review"
                            aria-describedby="transition-modal-review-description"
                            open={showReview}
                            className={classes.modal}
                            onClose={handleCloseReview}
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={showReview}>
                                <ReviewRef
                                    ref={ref}
                                    reviews={location.postId}
                                    handleClose={handleCloseReview}
                                />
                            </Fade>
                        </Modal>
                    </CardContent>
                </Grid>

                <Collapse in={showDetail} style={{ width: "100%" }}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Detail
                            location={location}
                            isEdit={isEdit}
                            indexDate={indexDate}
                            indexLocation={indexLocation}
                        />
                    </Grid>
                </Collapse>

            </Grid>
        </Card>
    )
}
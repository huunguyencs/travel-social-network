import { Button, Card, CardContent, CardMedia, Grid, IconButton, InputBase, Modal, Typography, Backdrop, Fade, MenuItem, Dialog, DialogTitle, DialogActions, Popper, ClickAwayListener, Paper, MenuList } from "@material-ui/core";
import React, { useState } from "react";
import { MoreVert } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { tourdetailStyles } from "../../style";
import CreateReviewForm from "../Forms/CreateReview";
import EditLocationForm from "../Forms/EditLocation";
import * as tourAction from '../../redux/actions/createTourAction';
// import customAxios from "../../utils/fetchData";
// import { removeReview } from "../../redux/callApi/tourCall";

function Detail(props) {

    const classes = tourdetailStyles();
    const dispatch = useDispatch();

    const { location, isEdit, isSave, indexDate, indexLocation } = props;

    const [description, setDescription] = useState(location.description);
    const [time, setTime] = useState(location.time);
    const [cost, setCost] = useState(location.cost);


    const [showRv, setShowRv] = useState(false);

    const handleShowReview = () => {
        setShowRv(true);
        // if (location.postId) {
        //     getReviewPost();
        // }
    }

    const handleUpdateInfo = () => {
        dispatch(tourAction.updateLocation({ cost: parseInt(cost), description: description, indexDate: indexDate, indexLocation: indexLocation, time: time }))
    }


    return (
        <Paper style={{ width: 1000 }}>
            <Grid container>
                <Grid item md={6} sm={12} xs={12}>
                    <div style={{ padding: 30 }}>
                        <img src={location.location.images[0]} alt="Location" style={{ width: "100%", height: 400 }} />
                    </div>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <div style={{ padding: 30 }}>
                        <Typography variant="h4" component={Link} to={"/location/" + location.location.name}>{location.location.fullname}</Typography>
                        {
                            isEdit ?
                                <div>
                                    <InputBase
                                        placeholder="Thông tin"
                                        title="Thông tin"
                                        variant="outlined"
                                        name="description"
                                        id="description"
                                        style={{ width: "100%" }}
                                        // className={classes.hashtag}
                                        multiline
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                    <InputBase
                                        placeholder="Thời gian"
                                        title="Thời gian"
                                        variant="outlined"
                                        name="time"
                                        id="time"
                                        style={{ width: "100%" }}
                                        // className={classes.hashtag}
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                    />
                                    <InputBase
                                        placeholder="Chi phí"
                                        title="Chi phí"
                                        variant="outlined"
                                        name="cost"
                                        id="cost"
                                        type="number"
                                        style={{ width: "100%" }}
                                        // className={classes.hashtag}
                                        value={cost}
                                        onChange={e => setCost(e.target.value)}
                                    />
                                    <div>
                                        <Button onClick={handleUpdateInfo}>Cập nhật</Button>
                                    </div>
                                </div> :
                                <div>
                                    <Typography>Chi phí: {new Intl.NumberFormat().format(location.cost * 1000)} VND</Typography>
                                    <Typography>Thời gian: {location.time}</Typography>
                                    <Typography>Mô tả: {location.description}</Typography>
                                </div>
                        }
                        {
                            isSave && location.postId?.length > 0 && <div> <Button className={classes.reviewBtn} onClick={handleShowReview}>Xem Review</Button> </div>
                        }
                    </div>
                </Grid>
                {
                    showRv &&
                    <Grid item md={12} sm={12} xs={12}>

                    </Grid>
                }
            </Grid>

        </Paper>
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
    // const [review, setReview] = useState(null);
    // const [notFoundRv, setNotFoundRv] = useState(false);
    // const [showInfo, setShowInfo] = useState(false);

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

    // const getReviewPost = async () => {
    //     await customAxios().get(`/post/${location.postId}`).then(res => {
    //         setReview(res.data.post);
    //     }).catch(err => {
    //         if (err.response.status === 404) {
    //             setNotFoundRv(true);
    //             dispatch(removeReview(tourDateId, token, location._id))
    //             // console.log(tourDateId)
    //             // console.log(location._id)
    //         }
    //     });
    // }

    // const handleShowReview = () => {
    //     setShowRv(true);
    //     if (location.postId) {
    //         getReviewPost();
    //     }
    // }

    // const handleCloseReview = () => {
    //     setShowRv(false);
    // }



    const handleShowDetail = () => {
        setShowDetail(true);
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

    const refEdit = React.createRef();
    const refCr = React.createRef();
    const refDetail = React.createRef();

    const EditLocationRef = React.forwardRef((props, ref) =>
        <EditLocationForm {...props} innerRef={ref} />
    )

    const CreateReviewRef = React.forwardRef((props, ref) =>
        <CreateReviewForm {...props} innerRef={ref} />
    )

    const DetailRef = React.forwardRef((props, ref) =>
        <Detail {...props} innerRef={ref} />
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
                                    <Typography variant="h5" className={classes.locationName} onClick={handleShowDetail}>{location.location.fullname}</Typography>
                                </div>
                                <div>
                                    <Typography variant="h6" component={Link} to={"/province/" + location.location.province.name}>{location.location.province.fullname}</Typography>
                                </div>
                                {
                                    isSave && isOwn && !location.postId && <div> <Button className={classes.reviewBtn} onClick={handleShow}>Tạo Review</Button> </div>
                                }
                                <Button onClick={handleShowDetail}>Chi tiết</Button>
                                <Modal
                                    aria-labelledby="transition-modal-service"
                                    aria-describedby="transition-modal-service-description"
                                    open={showDetail}
                                    className={classes.modal}
                                    onClose={handleCloseDetail}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={showDetail}>
                                        <DetailRef
                                            ref={refDetail}
                                            {...props}
                                        />
                                    </Fade>
                                </Modal>
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
                    </CardContent>
                </Grid>

                {/* <Collapse in={showInfo} style={{ width: "100%" }}>
                    <Grid item md={12} sm={12} xs={12}>
                        {
                            isEdit ?
                                <InputBase
                                    placeholder="Hashtag"
                                    title="Hashtag"
                                    variant="outlined"
                                    name="hashtag"
                                    id="hashtag"
                                // className={classes.hashtag}
                                // value={hashtag}
                                // onChange={e => setHashtag(e.target.value)}
                                /> :
                                <CardContent className={classes.review}>
                                    <Typography>Thông tin</Typography>
                                </CardContent>
                        }

                    </Grid>
                </Collapse> */}

            </Grid>
        </Card>
    )
}
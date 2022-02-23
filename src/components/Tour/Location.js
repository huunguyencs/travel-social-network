import { Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Typography, Backdrop, Fade, MenuItem, Dialog, DialogTitle, DialogActions, Collapse, CircularProgress, CardActions, Popper, ClickAwayListener, Paper, MenuList } from "@material-ui/core";
import React, { useState } from "react";
import { Rating } from '@material-ui/lab'
import { MoreVert } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { tourdetailStyles } from "../../style";
import CreateReviewForm from "../Forms/CreateReview";
import EditLocationForm from "../Forms/EditLocation";
import * as tourAction from '../../redux/actions/createTourAction';
import customAxios from "../../utils/fetchData";
import { removeReview } from "../../redux/callApi/tourCall";


export default function Location(props) {

    const classes = tourdetailStyles();

    const { token } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const { location, isOwn, isEdit, isSave, tourDateId, indexDate, indexLocation, addReview } = props;

    const [showRv, setShowRv] = useState(false);
    const [showCreateRv, setShowCreateRv] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editLoc, setEditLoc] = useState(false);
    const [showDeleteLocation, setShowDeleteLocation] = useState(false);
    const [review, setReview] = useState(null);
    const [notFoundRv, setNotFoundRv] = useState(false);

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

    const getReviewPost = async () => {
        await customAxios().get(`/post/${location.postId}`).then(res => {
            setReview(res.data.post);
        }).catch(err => {
            if (err.response.status === 404) {
                setNotFoundRv(true);
                dispatch(removeReview(tourDateId, token, location._id))
                console.log(tourDateId)
                console.log(location._id)
            }
        });

    }

    const handleShowReview = () => {
        if (!showRv) {
            setShowRv(true);
            if (location.postId) {
                getReviewPost();
            }
        }
        else setShowRv(false);

    }

    const refEdit = React.createRef();
    const refCr = React.createRef();

    const EditLocationRef = React.forwardRef((props, ref) =>
        <EditLocationForm {...props} innerRef={ref} />
    )

    const CreateReviewRef = React.forwardRef((props, ref) =>
        <CreateReviewForm {...props} innerRef={ref} />
    )

    return (
        <Card className={classes.cardContainer}>

            <Grid container>
                <Grid item md={5} sm={3} className={classes.imageLocation}>
                    <CardMedia className={classes.imgContainer}>
                        <img src={location.location.images[0]} alt="Loading..." className={classes.img} />
                    </CardMedia>

                </Grid>
                <Grid item md={7} sm={9} xs={12}>
                    <CardContent className={classes.contentContainer}>

                        <div className={classes.locationContentContainer}>
                            <div>
                                <div>
                                    <Typography variant="h5" className={classes.locationName} component={Link} to={"/location/" + location.location.name}>{location.location.fullname}</Typography>
                                </div>
                                <div>
                                    <Typography variant="h6" component={Link} to={"/province/" + location.location.province.name}>{location.location.province.fullname}</Typography>
                                </div>
                                {
                                    isSave && isOwn && !location.postId && <div> <Button className={classes.reviewBtn} onClick={handleShow}>Tạo Review</Button> </div>
                                }
                                {
                                    isSave && location.postId && <div> <Button className={classes.reviewBtn} onClick={handleShowReview}>{showRv ? "Ẩn" : "Xem"} Review</Button> </div>
                                }
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

                <Collapse in={showRv} style={{ width: "100%" }}>
                    {!notFoundRv ?
                        review ?
                            <Grid item md={12} sm={12} xs={12}>
                                <hr className={classes.line} />
                                <CardContent className={classes.review}>
                                    <Rating
                                        name={"rating" + review._id}
                                        value={review.rate}
                                        readOnly
                                    />
                                    <Typography>{review.content}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to={`/post/${review._id}`} className={classes.seeDetail}>Xem chi tiết</Button>
                                </CardActions>
                            </Grid>
                            : <CircularProgress color="inherit" />
                        : <Typography>Nội dung không tồn tại</Typography>}
                </Collapse>

            </Grid>
        </Card>
    )
}
import { Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Typography, Backdrop, Fade, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Collapse, CircularProgress, CardActions } from "@material-ui/core";
import React, { useState } from "react";
import { Rating } from '@material-ui/lab'
import { MoreVert } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { tourdetailStyles } from "../../style";
import CreateReviewForm from "../forms/createReview";
import EditLocationForm from "../forms/editLocation";
import * as tourAction from '../../redux/actions/createTourAction';
import customAxios from "../../utils/fetchData";


const MenuListProps = {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
    },
    '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
    },
}


export default function Location(props) {

    const classes = tourdetailStyles();

    const dispatch = useDispatch();

    const { location, isOwn, isEdit, isSave, tourDateId, indexDate, indexLocation } = props;

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
            if (err.response.status === 404)
                setNotFoundRv(true);
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


    return (
        <Card className={classes.cardContainer}>

            <Grid container>
                <Grid item md={5} className={classes.imageLocation}>
                    <CardMedia className={classes.imgContainer}>
                        <img src={location.location.images[0]} alt="location" className={classes.img} />
                    </CardMedia>

                </Grid>
                <Grid item md={7}>
                    <CardContent className={classes.contentContainer}>
                        {isEdit &&
                            <div className={classes.tourHeader}>
                                <div>
                                </div>
                                <IconButton aria-label="settings" onClick={handleShowMenu} size="small">
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    disablePortal={true}
                                    MenuListProps={MenuListProps}
                                // transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
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
                                            <EditLocationForm
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
                                            <Button onClick={handleDeleteLocation}>
                                                Xóa
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Menu>
                            </div>
                        }
                        <div>
                            <Typography variant="h4" className={classes.locationName} component={Link} to={"/location/" + location.location.name}>{location.location.fullname}</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component={Link} to={"/province/" + location.location.province.name}>{location.location.province.fullname}</Typography>
                        </div>
                        {
                            isSave && isOwn && !location.postId && <Button className={classes.reviewBtn} onClick={handleShow}>Tạo Review</Button>
                        }
                        {
                            isSave && location.postId && <Button className={classes.reviewBtn} onClick={handleShowReview}>{showRv ? "Ẩn" : "Xem"} Review</Button>
                        }


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
                                <CreateReviewForm
                                    location={location.location._id}
                                    cost={location.cost}
                                    handleClose={handleClose}
                                    tourDateId={tourDateId}
                                    indexLocation={location._id}
                                    locationName={location.location.name}
                                />
                            </Fade>
                        </Modal>
                    </CardContent>
                </Grid>
                <Collapse in={showRv}>
                    {!notFoundRv ?
                        review ?
                            <Grid item md={12}>
                                <CardContent className={classes.review}>
                                    <Typography component="legend">Đánh giá: </Typography>
                                    <Rating
                                        name={"rating" + review._id}
                                        value={review.rate}
                                        readOnly
                                    />
                                    <Typography>{review.content}</Typography>
                                </CardContent>
                                <CardMedia>

                                </CardMedia>
                                <CardActions>
                                    <Button component={Link} to={`/post/${review._id}`} className={classes.seeDetail}>Xem chi tiết</Button>
                                </CardActions>
                            </Grid>
                            : <CircularProgress />
                        : <Typography>Nội dung không tồn tại</Typography>}
                </Collapse>

            </Grid>
        </Card>
    )
}
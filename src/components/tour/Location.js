import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, Modal, Typography, Backdrop, Fade, Menu, MenuItem, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import React, { useState } from "react";
import { Rating } from '@material-ui/lab'
import { Favorite, FavoriteBorderOutlined, MoreVert } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { tourdetailStyles } from "../../style";
import CreateReviewForm from "../forms/createReview";
import EditLocationForm from "../forms/editLocation";
import * as tourAction from '../../redux/actions/createTourAction';


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


    const isReviewed = false;
    const [showRv, setShowRv] = useState(false);
    const [showCreateRv, setShowCreateRv] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(0);
    const [valueRate, setValueRate] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editLoc, setEditLoc] = useState(false);
    const [showDeleteLocation, setShowDeleteLocation] = useState(false);

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

    const likeHandle = (e) => {
        setLike(!like);
        if (!like) setNumLike(numLike + 1);
        else setNumLike(numLike - 1);
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
        dispatch(tourAction.deleteLocation({ indexDate: props.indexDate, indexLocation: props.indexLocation }));
        handleCloseDelete();
        handleCloseMenu();
    }

    const locationInfo = props.location;

    return (
        <Card className={classes.cardContainer}>

            <Grid container>
                <Grid item md={5}>
                    <CardMedia className={classes.imgContainer}>
                        <img src={locationInfo.location.image} alt="location" className={classes.img} />
                    </CardMedia>

                </Grid>
                <Grid item md={7}>
                    <CardContent className={classes.contentContainer}>
                        <div className={classes.tourHeader}>
                            <Typography variant="body1" style={{ paddingTop: 20 }}>
                                {
                                    locationInfo.fromPrev ?
                                        locationInfo.fromPrev === 0 ? "Điểm bắt đầu" : `Khoảng ${locationInfo.fromPrev} phút đi xe từ điểm trước đó.`
                                        : "Đang xử lý thời gian"
                                }
                            </Typography>
                            <IconButton aria-label="settings" onClick={handleShowMenu}>
                                <MoreVert style={{ fontSize: "20px" }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                MenuListProps={MenuListProps}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                                        <EditLocationForm handleCloseParent={handleCloseMenu} handleClose={handleCloseEdit} indexDate={props.indexDate} indexLocation={props.indexLocation} location={locationInfo} />
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

                        <Typography variant="h4" className={classes.locationName} component={Link} to={"/location/" + locationInfo.location._id}>{locationInfo.location.locationName}</Typography>
                        <Typography variant="h5">{locationInfo.province}</Typography>
                        {isReviewed ?
                            <Button className={classes.reviewBtn} onClick={() => setShowRv((value) => setShowRv(!value))}>{showRv ? "Ẩn" : "Xem"} Review</Button> :
                            <Button className={classes.reviewBtn} onClick={handleShow}>Tạo Review</Button>
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
                                <CreateReviewForm />
                            </Fade>
                        </Modal>
                        <div className={classes.costContainer}>
                            <Typography variant="body1">Chi phí: {locationInfo.cost}.000 VND</Typography>
                        </div>
                    </CardContent>
                </Grid>
                <Collapse in={showRv}>
                    {/* <Grid item md={12}>
                        <CardContent className={classes.review}>
                            <Typography component="legend">Đánh giá: </Typography>
                            <Rating
                                name={"rating" + tourInfo.id}
                                value={valueRate}
                                onChange={(e, newValue) => {
                                    setValueRate(newValue);
                                }}
                            />
                            <Typography>Đây là review</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={likeHandle} className={classes.marginIcon}>
                                {
                                    like ? <Favorite className={classes.likeIcon} /> : <FavoriteBorderOutlined />
                                }

                            </IconButton>
                            <Typography className={classes.numLike}>
                                {numLike}
                            </Typography>
                            <Button>Xem chi tiết</Button>
                        </CardActions>
                    </Grid> */}
                </Collapse>

            </Grid>
        </Card>
    )
}
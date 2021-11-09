import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, Modal, Typography, Backdrop, Fade } from "@material-ui/core";
import React, { useState } from "react";
import { Rating } from '@material-ui/lab'
import { Favorite, FavoriteBorderOutlined, MoreVert } from "@material-ui/icons";
import { tourdetailStyles } from "../../style";
import CreateReviewForm from "../forms/createReview";


export default function Location(props) {

    const classes = tourdetailStyles();


    const isReviewed = false;
    const [showRv, setShowRv] = useState(false);
    const [showCreateRv, setShowCreateRv] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(0);
    const [valueRate, setValueRate] = useState(0);

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

    const tourInfo = props.tour;

    return (
        <Card className={classes.cardContainer}>

            <Grid container>
                <Grid item md={5}>
                    <CardMedia className={classes.imgContainer}>
                        <img src={tourInfo.img} alt="hehe" className={classes.img} />
                    </CardMedia>

                </Grid>
                <Grid item md={7}>
                    <CardContent className={classes.contentContainer}>
                        <div className={classes.tourHeader}>
                            <Typography variant="body1" style={{ paddingTop: 20 }}>
                                {
                                    tourInfo.fromPrev ?
                                        tourInfo.fromPrev === 0 ? "Điểm bắt đầu" : `Khoảng ${tourInfo.fromPrev} phút đi xe từ điểm trước đó.`
                                        : "Đang xử lý thời gian"
                                }
                            </Typography>
                            <IconButton aria-label="settings">
                                <MoreVert style={{ fontSize: "20px" }} />
                            </IconButton>
                        </div>

                        <Typography variant="h4" className={classes.locationName}>{tourInfo.location}</Typography>
                        <Typography variant="h5">{tourInfo.province}</Typography>
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
                            <Typography variant="body1">Chi phí: {tourInfo.cost}.000 VND</Typography>
                        </div>
                    </CardContent>
                </Grid>
                <Collapse in={showRv}>
                    <Grid item md={12}>
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
                    </Grid>
                </Collapse>

            </Grid>
        </Card>
    )
}
import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Container, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, Rating } from '@material-ui/lab'
import { Favorite, FavoriteBorderOutlined, MoreVert } from "@material-ui/icons";
import { tourdetailStyles } from "../../style";

function Tour(props) {

    const classes = tourdetailStyles();

    const isReviewed = true;
    const [showRv, setShowRv] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(0);
    const [valueRate, setValueRate] = useState(0);

    const likeHandle = (e) => {
        setLike(!like);
        if (!like) setNumLike(numLike + 1);
        else setNumLike(numLike - 1);

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
                                {tourInfo.fromPrev === 0 ? "Điểm bắt đầu" : `Khoảng ${tourInfo.fromPrev} phút đi xe từ điểm trước đó.`}
                            </Typography>
                            <IconButton aria-label="settings">
                                <MoreVert style={{ fontSize: "20px" }} />
                            </IconButton>
                        </div>

                        <Typography variant="h4" className={classes.locationName}>{tourInfo.location}</Typography>
                        <Typography variant="h5">{tourInfo.province}</Typography>
                        {isReviewed ?
                            <Button className={classes.reviewBtn} onClick={() => setShowRv(!showRv)}>{showRv ? "Ẩn" : "Xem"} Review</Button> :
                            <Button className={classes.reviewBtn}>Tạo Review</Button>
                        }
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

export default function TourDetail(props) {

    const [idx, setIdx] = useState(0);

    const classes = tourdetailStyles();

    const listTour = props.tour.tourList;

    return (
        <div>
            <div className={classes.coverTitle}>
                <Typography variant="h3" className={classes.title}>{props.tour.tourName}</Typography>
            </div>
            <Grid container className={classes.container}>
                <Grid item md={2} >
                    <Container className={classes.timeline}>
                        <Timeline align="right">
                            {listTour.map((item, index) => (
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot className={index === idx ? classes.activeDot : classes.unactiveDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                            {item.time}
                                        </Button>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Container>
                </Grid>
                <Grid item md={6} className={classes.feedTour}>
                    {
                        listTour[idx].tour.map((item) => (
                            <Tour tour={item} />
                        ))
                    }
                    <div className={classes.addContainer}>
                        <Button className={classes.addTour}>
                            Thêm
                        </Button>
                    </div>

                </Grid>
                <Grid item md={4}>
                    <Container>

                    </Container>
                </Grid>
            </Grid>
        </div >
    )
}
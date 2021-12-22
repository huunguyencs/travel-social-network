import { Avatar, Backdrop, Button, CardContent, CardHeader, CardMedia, IconButton, Modal, Typography } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { joinTour, unJoinTour } from '../../redux/callApi/tourCall'
import { postStyles } from '../../style'
import { convertDateToStr, timeAgo } from '../../utils/date'
import ImageModal from '../modal/image'
import ManageUserJoin from '../modal/manageUserJoin'
import UserList from '../modal/userList'
import { SeeMoreText } from '../seeMoreText'

function ShareContent({ tour }) {

    const [tourShare, setTourShare] = useState(null);

    useEffect(() => {
        if (tour.shareId) {
            setTourShare(tour.shareId);
        }
    }, [tour, setTourShare])

    const classes = postStyles();
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
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
            <BaseContent tour={tourShare} setTour={setTourShare} />
        </>
    )
}

function BaseContent({ tour, setTour }) {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

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
        setJoin(true);
        var prevJoin = tour.joinIds;
        updateJoin([...prevJoin, auth.user]);
        dispatch(joinTour(tour._id, auth.token, () => {
            if (join) {
                setJoin(false);
                updateJoin(prevJoin);
            }
        }))
    }

    const handleUnJoin = () => {
        setJoin(false);
        var prevJoin = tour.joinIds;
        var newJoin = prevJoin.filter(user => user._id !== auth.user._id);
        updateJoin(newJoin);

        dispatch(unJoinTour(tour._id, auth.token, () => {
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

    const [open, setOpen] = useState(false);
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
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
                        <Button onClick={joinClick}>{join ? "Rời khỏi tour" : "Tham gia tour"}</Button>

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
                    {tour.hashtags.map((item) =>
                        <Typography className={classes.hashtag}>{item}</Typography>
                    )}
                </div>

            </CardContent>
        </>
    )
}

export default function TourContent({ tour, setTour }) {
    return (
        <>
            {tour.shareId ? <ShareContent tour={tour} /> : <BaseContent tour={tour} setTour={setTour} />}
        </>
    )
}

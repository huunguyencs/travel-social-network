import { Avatar, Button, Card, CardContent, CardMedia, CircularProgress, Drawer, IconButton, InputBase, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { serviceStyles } from '../../style';
import { getStar } from '../../utils/utils';
import { SeeMoreText } from '../seeMoreText';
import ImageList from '../modal/ImageList';
import { getRate, reviewService } from '../../redux/callApi/serviceCall';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from '../input/emojiPicker';
import { Send } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export function ReviewArea(props) {
    const { id } = props;
    const [text, setText] = useState('')
    const { auth } = useSelector(state => state);
    const [rate, setRate] = useState(0);


    const classes = serviceStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rate && rate !== 0) {
            setRate(0);
            setText('');
            dispatch(reviewService(id, auth, rate, text))
        }
    }


    return (
        <div className={classes.formContainer}>
            <form
                onSubmit={handleSubmit}
                className={classes.formReview}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                    <Rating size='small' name="rate" value={rate} onChange={e => setRate(parseInt(e.target.value))} disabled={!auth.token} />
                </div>

                <div className={classes.contentWrap}>
                    <EmojiPicker content={text} setContent={setText} />
                    <InputBase
                        name="content"
                        placeholder='Viết review...'
                        value={text}
                        multiline
                        disabled={!auth.token}
                        onChange={e => setText(e.target.value)}
                        className={classes.contentInput}
                    />
                    <IconButton disabled={!text || text.trim() === ""} type="submit">
                        <Send />
                    </IconButton>
                </div>
            </form>
        </div>
    )
}


function ReviewService(props) {

    const { review } = props;

    const classes = serviceStyles();

    return (
        <div className={classes.reviewItemContainer}>
            <Avatar alt="avatar" src={review.userId.avatar} className={classes.avatar} />
            <div className={classes.reviewContentContainer}>
                <strong className={classes.reviewerName} component={Link} to={review.userId.role === 1 ? `/co/${review.userId._id}` : `/u/${review.userId._id}`}>{review.userId.fullname}</strong>
                <div className={classes.rate}>
                    <Rating name="read-only" value={review.rate} readOnly size="small" />
                </div>
                <Typography className={classes.reviewContent}>{review.content}</Typography>
            </div>
        </div>
    )
}

export default function ServiceItem(props) {

    const { service } = props;
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const dispatch = useDispatch();

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
            return;

        setOpen(open);
    }

    const getServiceRate = (service, dispatch) => {
        setState({
            loading: true,
            error: false
        })
        dispatch(getRate(service._id, () => {
            setState({
                loading: false,
                error: false
            })
        }, () => {
            setState({
                loading: false,
                error: true
            })
        }))
    }


    useEffect(() => {
        if (open && !service.rate) {
            getServiceRate(service, dispatch);
        }
    }, [open, service, dispatch])


    const classes = serviceStyles();

    return (
        <>
            <Card className={classes.container} id={service._id}>
                <CardMedia>
                    <ImageList imageList={service.images} show2Image={true} />
                </CardMedia>
                <div>
                    <CardContent>
                        <Typography variant='h5' className={classes.serviceName}>
                            {service.name}
                        </Typography>
                        <SeeMoreText maxText={50} text={service.description} variant={'body1'} />
                        <div className={classes.rate}>
                            <Rating name="read-only" value={getStar(service.star)} readOnly size="medium" />
                        </div>
                        <Typography className={classes.discount}>{service.discount}</Typography>
                    </CardContent>
                    <div>
                        <Button className={classes.seeReview} onClick={toggleDrawer(true)}>Xem review</Button>
                    </div>
                </div>
            </Card>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div className={classes.reviewContainer}>
                    <div className={classes.centerMarginTop}>
                        <Typography variant='h5'>Review {service.name}</Typography>
                    </div>
                    <div className={classes.center}>
                        {service.rate && (
                            <>
                                <Typography variant='h6'>Tổng số review: {service.rate?.length}</Typography>
                                <Rating name="read-only" value={getStar(service.star)} readOnly size="medium" />
                            </>
                        )}
                    </div>

                    <div className={classes.contentContainerWrap}>
                        <div className={classes.contentReview}>
                            {
                                state.loading ?
                                    <div className={classes.centerMarginTop}>
                                        <CircularProgress />
                                    </div> :
                                    state.error ?
                                        <div className={classes.centerMarginTop}>
                                            <Button onClick={getServiceRate(service)}>Thử lại</Button>
                                        </div> :
                                        service.rate && (
                                            service.rate.length === 0 ?
                                                <div className={classes.centerMarginTop}>
                                                    <Typography>Chưa có review cho dịch vụ này</Typography>
                                                </div> :
                                                <div>
                                                    {service.rate.map((item, index) => (
                                                        <ReviewService key={index} review={item} />
                                                    ))}
                                                </div>
                                        )
                            }
                        </div>
                    </div>
                    <div className={classes.reviewArea}>
                        <ReviewArea id={service._id} />
                    </div>
                </div>
            </Drawer>
        </>
    )
}

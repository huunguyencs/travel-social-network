import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Fade, Modal, Typography } from "@material-ui/core";

import Tour from "../Tour";
import { feedStyles } from "../../style";
import CreateTourForm from "../Forms/CreateTour";
import { useSelector, useDispatch } from "react-redux";
import { getMoreTours, getTours } from "../../redux/callApi/tourCall"
import FilterTour from "../Forms/FilterTour";
import { Tune } from "@material-ui/icons";
import SuccessIcon from "../Icons/Success";


export default function FeedTour(props) {

    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);
    const [fetch, setFetch] = useState(false);

    const [cost, setCost] = useState([0, 100]);
    const [text, setText] = useState('');
    const [isFiltering, setIsFiltering] = useState(false);

    const classes = feedStyles();

    const [show, setShow] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShowFilter = () => {
        setShowFilter(true);
    }

    const handleCloseFilter = () => {
        setShowFilter(false);
    }

    const removeFilter = () => {
        setCost([0, 100]);
        setText('');
        dispatch(getTours());
        setIsFiltering(false);
    }

    const loadTour = (page, dispatch, hasMore) => {
        if (hasMore) {
            dispatch(getMoreTours(page));
        }
        setFetch(false);
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setFetch(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    const tryAgain = () => {
        loadTour(tour.page, dispatch, tour.hasMore)
    }


    useEffect(() => {
        if (fetch) {
            loadTour(tour.page, dispatch, tour.hasMore);
        }
    }, [fetch, tour.page, dispatch, tour.hasMore])

    const ref = React.createRef();
    const refFilter = React.createRef();

    const CreateTourRef = React.forwardRef((props, ref) =>
        <CreateTourForm innerRef={ref} {...props} />
    )

    const FilterTourRef = React.forwardRef((props, ref) =>
        <FilterTour innerRef={ref} {...props} />
    )

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.createTourContainer}>
                    <Button className={classes.createTour} onClick={handleShow} disabled={!auth.token}>
                        Lên lịch trình ngay!
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={show}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={show}>
                            <CreateTourRef ref={ref} handleClose={handleClose} />
                        </Fade>
                    </Modal>
                </div>


                <div className={classes.feedContent}>
                    <div style={{ display: 'flex', justifyContent: 'right', margin: 10 }}>
                        <Button
                            onClick={handleShowFilter}
                            startIcon={<Tune />}
                        >
                            Lọc
                        </Button>
                    </div>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={showFilter}
                        onClose={handleCloseFilter}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={showFilter}>
                            <FilterTourRef
                                ref={refFilter}
                                handleClose={handleCloseFilter}
                                costParent={cost}
                                setCostParent={setCost}
                                textParent={text}
                                setTextParent={setText}
                                setFilter={setIsFiltering}
                            />
                        </Fade>
                    </Modal>
                    {
                        isFiltering &&
                        <div>
                            <Typography>
                                Đang lọc:
                            </Typography>
                            <ul>
                                <li>Chi phí: {cost[0] === 0 ? 'Tối thiểu' : (new Intl.NumberFormat().format(cost[0] * 10000) + ' VND')}  - {cost[1] === 100 ? 'Tối đa' : (new Intl.NumberFormat().format(cost[1] * 10000) + ' VND')} </li>
                                <li>Từ khóa: {text}</li>
                            </ul>
                            <Button onClick={removeFilter}>Xoá bộ lọc</Button>
                        </div>
                    }

                    <div>
                        {
                            !tour.loading && !tour.error &&
                            tour.tours.map((tour) => (
                                <Tour
                                    tour={tour}
                                    key={tour._id}
                                />
                            ))
                        }
                        {
                            tour.loading &&
                            <div className={classes.centerMarginTop}>
                                <CircularProgress color={"inherit"} />
                            </div>
                        }

                        {
                            tour.error &&
                            <div className={classes.centerMarginTop}>
                                <div>
                                    <Typography>Có lỗi xảy ra</Typography>
                                    <Button onClick={tryAgain}>Thử lại</Button>
                                </div>
                            </div>
                        }
                        {
                            !tour.loading && !tour.error && !tour.hasMore &&
                            <div style={{ textAlign: 'center', marginBlock: 30 }}>
                                <SuccessIcon style={{ margin: 'auto', fontSize: 50 }} />
                                <Typography style={{ margin: 'auto', fontSize: 24 }}>Bạn đã xem hết hành trình</Typography>
                            </div>
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}
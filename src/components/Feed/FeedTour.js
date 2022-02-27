import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Fade, Modal, Typography } from "@material-ui/core";

import Tour from "../Tour";
import { feedStyles } from "../../style";
import CreateTourForm from "../Forms/CreateTour";
import { useSelector, useDispatch } from "react-redux";
import { getMoreTours } from "../../redux/callApi/tourCall"
import FilterTour from "../Forms/FilterTour";
import { Tune } from "@material-ui/icons";
import SuccessIcon from "../Icons/Success";


export default function FeedTour(props) {

    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);
    const [fetch, setFetch] = useState(false);

    const [cost, setCost] = useState([10, 20]);
    const [text, setText] = useState('');

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
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
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
                            />
                        </Fade>
                    </Modal>

                    <div>
                        {
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
                            !tour.hasMore &&
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
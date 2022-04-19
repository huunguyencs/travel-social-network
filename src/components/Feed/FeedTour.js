import React, { useState } from "react";
import { Backdrop, Button, Fade, Modal, Typography, BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import Tour from "../Tour";
import Feed from './index';
import { feedStyles } from "../../style";
import CreateTourForm from "../Forms/CreateTour";
import { useSelector, useDispatch } from "react-redux";
import { getMoreTours, getTours } from "../../redux/callApi/tourCall"
import FilterTour from "../Forms/FilterTour";
import {Restore, Favorite } from "@material-ui/icons";


export default function FeedTour(props) {

    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);

    const [cost, setCost] = useState([0, 100]);
    const [text, setText] = useState('');
    const [isFiltering, setIsFiltering] = useState(false);
    // const [filter, setFilter] = useState()

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

    const loadTour = () => {
        if (tour.hasMore) {
            var maxCost = cost[1], minCost = cost[0];
            if (minCost > maxCost) {
                minCost += maxCost;
                maxCost = minCost - maxCost;
                minCost -= maxCost;
            }
            dispatch(getMoreTours(tour.page, {
                maxCost: maxCost * 10,
                minCost: minCost * 10,
                q: text
            }));
        }
    }

    const tryAgain = () => {
        loadTour(tour.page, dispatch, tour.hasMore)
    }


    const ref = React.createRef();
    const refFilter = React.createRef();

    const CreateTourRef = React.forwardRef((props, ref) =>
        <CreateTourForm innerRef={ref} {...props} />
    )

    const FilterTourRef = React.forwardRef((props, ref) =>
        <FilterTour innerRef={ref} {...props} />
    )
    const [value, setValue] = useState(0);
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {/* <div className={classes.createTourContainer}>
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
                </div> */}
                <div className={classes.contentSubNav}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        showLabels
                        className={classes.contentSubNavList}
                        >
                        <BottomNavigationAction label="Hành trình của bạn" icon={<Restore />} />
                        <BottomNavigationAction label="Hành trình nổi bật" icon={<Favorite />} />
                    </BottomNavigation>
                </div>
                <div className={classes.feedContent}>
                    {/* <div style={{ display: 'flex', justifyContent: 'right', margin: 10 }}>
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
                    } */}
                    <Feed
                        loadMore={loadTour}
                        tryAgain={tryAgain}
                        loading={tour.loading}
                        error={tour.error}
                        hasMore={tour.hasMore}
                    >
                        {tour.tours.map((tour) => (
                            <Tour
                                tour={tour}
                                key={tour._id}
                            />
                        ))}
                    </Feed>
                </div>

            </div>

        </div>
    )
}
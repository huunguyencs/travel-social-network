import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, Container, Fade, Modal } from "@material-ui/core";

import Tour from "../tour/Tour";
import { feedStyles } from "../../style";
import { useSelector } from "react-redux";
import CreateTourForm from "../forms/createTour";



export default function FeedTour(props) {

    const classes = feedStyles();

    const { tour } = useSelector(state => state);

    const [show, setShow] = useState(false);

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <Button className={classes.createTour} onClick={() => setShow(true)}>
                        Lên lịch trình ngay!
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={show}
                        onClose={() => setShow(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={show}>
                            <CreateTourForm handleClose={() => setShow(false)} />
                        </Fade>
                    </Modal>
                </div>

                <div>
                    {
                        tour.loading ?
                            tour.error ?
                                <div>Có lỗi xảy ra</div> :
                                <CircularProgress color={"black"} /> :
                            tour.tours.map((tour) => (
                                <Tour
                                    tour={tour}
                                    key={tour._id}
                                />
                            ))
                    }
                </div>

            </div>

        </Container>
    )
}
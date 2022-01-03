import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Container, Fade, Modal } from "@material-ui/core";

import Tour from "../tour/Tour";
import { feedStyles } from "../../style";
import CreateTourForm from "../forms/createTour";
import customAxios from "../../utils/fetchData";



export default function FeedTour(props) {

    const { id } = props;

    const classes = feedStyles();

    const [tours, setTours] = useState([]);
    const [state, setState] = useState({
        loading: false,
        error: false,
    })

    const getMoreTour = async (id) => {
        setState({
            loading: true,
            error: false,
        })
        try {
            var url = id ? `/tour/user_tours/${id}` : `tour/tours`
            await customAxios().get(url).then(res => {
                setTours((state) => [
                    ...state,
                    ...res.data.tours
                ])
                setState({
                    loading: false,
                    error: false,
                })
            }).catch(err => {
                setState({
                    loading: false,
                    error: true,
                })
            })
        }
        catch (err) {
            setState({
                loading: false,
                error: true,
            })
        }
    }

    useEffect(() => {
        getMoreTour(id);
    }, [id])

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
                        state.loading ?
                            state.error ?
                                <div>Có lỗi xảy ra</div> :
                                <CircularProgress color={"black"} /> :
                            tours.map((tour) => (
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
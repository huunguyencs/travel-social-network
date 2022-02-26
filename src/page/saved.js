import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FeedTour from '../components/Feed/FeedTour';
import SpeedDialButton from '../components/SpeedDialBtn';
import { getTourSaved } from '../redux/callApi/tourCall';

const useStyle = makeStyles((theme) => ({
    container: {
        marginInline: 100,
        [theme.breakpoints.down("md")]: {
            marginInline: 60
        },
        [theme.breakpoints.down("sm")]: {
            marginInline: 20
        },
        [theme.breakpoints.down("xs")]: {
            marginInline: 0
        }
    }
}))

export default function TourSavedPage() {

    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(getTourSaved(token));
        }
    }, [dispatch, token, history])

    useEffect(() => {
        document.title = "Đã lưu";
    }, [])


    return (
        <>
            {
                token &&
                <>
                    <SpeedDialButton />
                    <Container >
                        <div className={classes.container}>
                            <FeedTour />
                        </div>
                    </Container>
                </>
            }
        </>
    );
}

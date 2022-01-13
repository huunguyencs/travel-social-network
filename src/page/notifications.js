import { Box, CircularProgress, Container, List, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import NotificationItem from "../components/notifications/notification";
import { notificationStyles } from "../style";
import customAxios from "../utils/fetchData";



export default function NotificationPage(props) {

    const classes = notificationStyles();

    const [end, setEnd] = useState(false);

    const [offset, setOffset] = useState(10);
    const [listNoti, setListNoti] = useState(null);
    const [state, setState] = useState({
        loading: false,
        loadingMore: false,
        error: false,
    })

    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        document.title = "Thông báo";
    }, [])

    const getNotifications = async (token) => {
        setState({
            error: false,
            loading: true
        })
        await customAxios(token).get('/notify/get_notifies?limit=10&offset=0').then(res => {
            if (res.data.notifies.length < 10) {
                setEnd(true);
            }
            setListNoti(res.data.notifies);
            setState({
                loading: false,
                error: false,
            })
        }).catch(err => {
            setState({
                loading: false,
                error: true
            })
        })
    }

    const loadMore = async () => {
        setState({
            loadingMore: true,
            error: false,
        })

        await customAxios(token).get(`/notify/get_notifies?limit=10&offset=${offset}`).then(res => {
            if (res.data.notifies.length < 10) {
                setEnd(true);
            }
            setListNoti(state => ([
                ...state,
                ...res.data.notifies
            ]));
            setState({
                loadingMore: false,
                error: false,
            })
            setOffset(state => state + 10)
        }).catch(err => {
            setState({
                loadingMore: false,
                error: true
            })
        })
    }

    useEffect(() => {
        if (token) {
            getNotifications(token)
        }
    }, [token])


    return (
        <Box className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Box flex={1} overflow="auto">
                <Container className={classes.fixWidth}>
                    {
                        state.loading ?
                            <div className={classes.centerMarginTop}>
                                <CircularProgress />
                            </div> :
                            state.error ?
                                <div>
                                    <Typography className={classes.centerMarginTop}>
                                        Có lỗi xảy ra
                                    </Typography>
                                </div> : listNoti &&
                                <List className={classes.list}>
                                    {listNoti.map((item) => (
                                        <NotificationItem noti={item} key={item._id} />
                                    ))}
                                    {
                                        !end &&
                                        <div className={classes.center}>
                                            {
                                                state.loadingMore ?
                                                    <CircularProgress /> :
                                                    <Typography onClick={loadMore} className={classes.seeAll}>
                                                        Tải thêm ...
                                                    </Typography>
                                            }
                                        </div>
                                    }

                                </List>
                    }
                </Container>
            </Box>
        </Box>
    )
}
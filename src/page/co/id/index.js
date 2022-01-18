import React, { createRef, useEffect, useState } from "react";
import Scroll from "../../../components/scroll";
import SpeedDialButton from "../../../components/speedDialBtn";
import ProfileAvatar from "../../../components/Profile/avatar";
import { serviceMenu } from "../../../constant/menu";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { NotFound } from "../../404";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../redux/callApi/userCall";
import useStyles from "../../../style";
import RightBar from "../../../components/rightbar/RightBar";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";
import ServiceList from "../../../components/service/ServiceList";

export default function ServicesServicePage(props) {

    // useEffect(() => {
    //     document.title = "GOGO";
    // })

    const ref = createRef();
    const classes = useStyles();

    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [notFound, setNotFound] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (!user.user || user.user._id !== id) {
            setNotFound(false);
            dispatch(getUser(id, 1, () => {
                setNotFound(true);
            }));
        }
    }, [user.user, id, dispatch, setNotFound])


    return (
        <>
            {
                notFound ?
                    <NotFound /> :
                    <>
                        <Scroll showBelow={500} />
                        <SpeedDialButton />
                        <ProfileAvatar user={user.user} />
                        <Grid container style={{ margin: 0, padding: 0 }}>
                            <Grid item md={3} sm={2} xs={2}>
                                <LeftBar menuList={serviceMenu} />
                            </Grid>
                            <Grid item md={6} sm={10} xs={2}>
                                <ServiceList />
                            </Grid>
                            <Grid item md={3} className={classes.rightbar}>
                                <RightBar ref={ref}>
                                    <Calendar />
                                    <FriendRecommendCard />
                                </RightBar>
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}
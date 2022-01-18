import { Grid } from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";

import LeftBar from "../../../components/leftbar/LeftBar";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import ProfileAvatar from "../../../components/Profile/avatar";
import { profileMenu } from "../../../constant/menu";
import SpeedDialButton from "../../../components/speedDialBtn";
import { useParams } from "react-router-dom";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/callApi/userCall";
import { NotFound } from "../../404";
import useStyles from "../../../style";



function InfoProfile() {

    // const classes = useStyles();
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [notFound, setNotFound] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (!user.user || user.user._id !== id) {
            setNotFound(false);
            dispatch(getUser(id, 0, () => {
                setNotFound(true);
            }));
        }
    }, [user.user, id, dispatch, setNotFound])

    const classes = useStyles();

    const ref = createRef();

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
                                <LeftBar menuList={profileMenu} />
                            </Grid>
                            <Grid item md={6} sm={10} xs={10}>

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
    );
}

export default InfoProfile;

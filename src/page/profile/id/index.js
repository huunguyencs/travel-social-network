import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import LeftBar from "../../../components/leftbar/LeftBar";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import ProfileAvatar from "../../../components/Profile/avatar";
import { profileMenu } from "../../../constant/menu";
import SpeedDialButton from "../../../components/speedDialBtn";
import Menu from "../../../components/leftbar/menu";
import { useParams } from "react-router-dom";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/callApi/userCall";
import { NotFound } from "../../404";



function InfoProfile() {

    // const classes = useStyles();
    const { auth, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [notFound, setNotFound] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (!user.user || user.user._id !== id) {
            setNotFound(false);
            dispatch(getUser(id, auth.user, () => {
                setNotFound(true);
            }));
        }
    }, [user.user, id, dispatch, auth, setNotFound])

    return (
        <div>
            {
                notFound ?
                    <NotFound /> :
                    <>
                        <Scroll showBelow={500} />
                        <SpeedDialButton />
                        <ProfileAvatar user={user.user} />
                        <Grid container style={{ margin: 0, padding: 0 }}>
                            <Grid item sm={3}>
                                <LeftBar >
                                    <Menu menuList={profileMenu} />
                                </LeftBar>
                            </Grid>
                            <Grid item sm={6}>

                            </Grid>
                            <Grid item sm={3}>
                                <RightBar>
                                    <Calendar />
                                    <FriendRecommendCard />
                                </RightBar>
                            </Grid>
                        </Grid>
                    </>
            }
        </div>
    );
}

export default InfoProfile;

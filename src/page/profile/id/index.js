import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import LeftBar from "../../../components/leftbar/LeftBar";
// import Feed from "../../../components/feed/FeedPost";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import ProfileAvatar from "../../../components/Profile/avatar";
import { profileMenu } from "../../../constant/menu";
import SpeedDialButton from "../../../components/speedDialBtn";
import Menu from "../../../components/leftbar/menu";
import { useParams } from "react-router-dom";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";



function InfoProfile() {

    // const classes = useStyles();

    const { id } = useParams();

    useEffect(() => {
        // console.log(id);
    }, [id]);

    return (
        <div>
            <Scroll showBelow={500} />
            <SpeedDialButton />
            <ProfileAvatar />
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
        </div>
    );
}

export default InfoProfile;

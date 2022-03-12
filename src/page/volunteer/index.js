import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import LeftBar from '../../components/Leftbar';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';
import { getVolunteers } from "../../redux/callApi/volunteerCall";

import VolunteerCard from '../../components/Volunteer/VolunteerCard';

export default function Volunteer() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVolunteers());
    }, [dispatch])

    useEffect(() => {
        document.title = "Du lịch tình nguyện | Triple H";
    }, [])

    const { volunteer } = useSelector(state => state);


    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10}>

                {
                    volunteer.loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                            <CircularProgress color='inherit' />
                        </div> :
                        volunteer.error ?
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                                Có lỗi xảy ra
                            </div> :
                            <Grid container style={{ marginTop: 120 }}>
                                {volunteer.volunteers.map(item => (
                                    <Grid item lg={4} md={6} sm={6} xs={12} key={item._id}>
                                        <VolunteerCard volunteer={item} />
                                    </Grid>
                                ))}
                            </Grid>
                }

            </Grid>
            {/* <Grid item md={3} className={classes.rightbar}>
                <RightBar ref={ref}>
                    <Calendar />
                    <FriendRecommendCard />
                </RightBar>
            </Grid> */}
        </Grid>
    )
}

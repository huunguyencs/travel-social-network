import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import LeftBar from '../../components/leftbar/LeftBar';
import SpeedDialButton from '../../components/speedDialBtn';
import { homeMenu } from '../../constant/menu';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { getVolunteers } from "../../redux/callApi/volunteerCall";
import { convertDateToStr} from '../../utils/date';

export default function Volunteer() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVolunteers());
    }, [dispatch])

    useEffect(() => {
        document.title = "Du lịch tình nguyện | GOGO";
    }, [])

    const { volunteer } = useSelector(state => state);
   

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10}>
                <div class="cards">
                    {
                        volunteer.volunteers.map(item =>(
                            <div class="card" component={Link} to={`/volunteer/${item._id}`}>
                                <img
                                    src={item.image}
                                    alt="Du lịch tình nguyện"
                                    class="card-image"
                                />
                                <div class="card-content">
                                    <div class="card-top">
                                        <Typography class="card-title" component={Link} to={`/volunteer/${item._id}`}>{item.name}</Typography>
                                        <div class="card-user">
                                            <img
                                                src={item.userId.avatar}
                                                alt="Avatar"
                                                class="card-user-avatar"
                                            />
                                            <div class="card-user-info">
                                                <div class="card-user-top">
                                                    <Typography class="card-user-name" component={Link} to={`/u/${item.userId._id}`} >{item.userId.fullname}</Typography>
                                                </div>
                                                <div class="card-user-game">{convertDateToStr(item.date[0].date)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-bottom">
                                        <ul class="card-bottom_info">
                                            <li class="card-bottom_info_li">
                                                Thời gian: {convertDateToStr(item.date[0].date)}
                                            </li>
                                            <li  class="card-bottom_info_li">
                                                Địa điểm xuất phát: {item.location[0].location.fullname}
                                            </li>
                                            <li  class="card-bottom_info_li">
                                                Thể loại: Giáo dục
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
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

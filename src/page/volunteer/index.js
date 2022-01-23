import { Grid } from '@material-ui/core';
import React, { createRef } from 'react'
// import Calendar from '../components/calendar';
// import FriendRecommendCard from '../components/card/FriendRecommend';
import LeftBar from '../../components/leftbar/LeftBar';
// import RightBar from '../components/rightbar/RightBar';
import SpeedDialButton from '../../components/speedDialBtn';
import { homeMenu } from '../../constant/menu';
// import useStyles from '../style'
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
export default function Volunteer() {
    const data= [
        {
            _id: "01",
            name: "DU LICH TINH NGUYEN",
            image:"https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            user:{
                _id: "0123",
                fullname: "Tran Quang Huy",
                avatar: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            description: "abc",
            dateStart: "12-02-2022",
            type: "Giáo dục",
            location: "Thành phố Hồ Chí Minh"
        },
        {
            _id: "02",
            name: "DU LICH TINH NGUYEN 2",
            image:"https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            user:{
                _id: "0123",
                fullname: "Tran Quang Huy",
                avatar: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            description: "abc",
            dateStart: "12-02-2022",
            type: "Giáo dục",
            location: "Thành phố Hồ Chí Minh"
        },
        {
            _id: "03",
            name: "DU LICH TINH NGUYEN 3",
            image:"https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            user:{
                _id: "0123",
                fullname: "Tran Quang Huy",
                avatar: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            description: "abc",
            dateStart: "12-02-2022",
            type: "Giáo dục",
            location: "Thành phố Hồ Chí Minh"
        },
        {
            _id: "04",
            name: "DU LICH TINH NGUYEN 4",
            image:"https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            user:{
                _id: "0123",
                fullname: "Tran Quang Huy",
                avatar: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            description: "abc",
            dateStart: "12-02-2022",
            type: "Giáo dục",
            location: "Thành phố Hồ Chí Minh"
        },
        {
            _id: "05",
            name: "DU LICH TINH NGUYEN 4",
            image:"https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            user:{
                _id: "0123",
                fullname: "Tran Quang Huy",
                avatar: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            description: "abc",
            dateStart: "12-02-2022",
            type: "Giáo dục",
            location: "Thành phố Hồ Chí Minh"
        }

    ]
    // const ref = createRef();

    // const classes = useStyles();

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10}>
                <div class="cards">
                    {
                        data.map(item =>(
                            <div class="card" component={Link} to={`/volunteer/${item._id}`}>
                                <img
                                    src={item.image}
                                    alt=""
                                    class="card-image"
                                />
                                <div class="card-content">
                                    <div class="card-top">
                                        <Typography class="card-title" component={Link} to={`/volunteer/${item._id}`}>{item.name}</Typography>
                                        <div class="card-user">
                                            <img
                                                src={item.user.avatar}
                                                alt=""
                                                class="card-user-avatar"
                                            />
                                            <div class="card-user-info">
                                                <div class="card-user-top">
                                                    <Typography class="card-user-name" component={Link} to={`/u/${item.user._id}`} >{item.user.fullname}</Typography>
                                                </div>
                                                <div class="card-user-game">{item.user.fullname}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-bottom">
                                        <ul class="card-bottom_info">
                                            <li class="card-bottom_info_li">
                                                Thời gian: {item.dateStart}
                                            </li>
                                            <li  class="card-bottom_info_li">
                                                Địa điểm: {item.location}
                                            </li>
                                            <li  class="card-bottom_info_li">
                                                Thể loại: {item.type}
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

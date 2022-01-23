import { Avatar, Grid, CardHeader,List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { Drafts, Inbox,DoneOutline,RadioButtonUnchecked } from '@material-ui/icons';
import React, { useState } from "react";
// import {  useParams } from "react-router-dom";
// import Calendar from '../components/calendar';
// import FriendRecommendCard from '../components/card/FriendRecommend';
import LeftBar from '../../components/leftbar/LeftBar';
// import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "../404";
import { Button, CircularProgress, Typography } from '@material-ui/core';
import SpeedDialButton from '../../components/speedDialBtn';
import { homeMenu } from '../../constant/menu';
import ImageList from '../../components/modal/ImageList';
import { tourdetailStyles } from "../../style";
export default function VolunteerDetail() {
    // const dispatch = useDispatch();
    // const { auth } = useSelector(state => state);

    // const { id } = useParams();
    // const [volunteer, setVolunteer] = useState();
    
    const images = [
        "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ]
    const date= [
        "20-11-2020",
        "21-11-2020",
        "22-11-2020"
    ]
    const schedule= [
        [{
            time: "9h-10h",
            activity: "1"
        },
        {
            time: "9h-10h",
            activity: "2"
        }],
        [{
            time: "9h-10h",
            activity: "3"
        },
        {
            time: "9h-10h",
            activity: "4"
        }],
        [{
            time: "9h-10h",
            activity: "5"
        },
        {
            time: "9h-10h",
            activity: "6"
        }]
    ]

    const [idx, setIdx] = useState(0);
    const classes = tourdetailStyles();
    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10} style={{padding: 30}}>
                {
                    state.notFound ?
                        <NotFound /> :
                        state.loading ?
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                                <CircularProgress />
                            </div>
                            : state.error ?
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                                    <>
                                        <Typography>Có lỗi xảy ra</Typography>
                                        <Button >Thử lại</Button>
                                    </>
                                </div> :

                                <div style={{marginTop:80}}>
                                    <Typography class="volunteer-detail_title">Du Lịch tình nguyện</Typography>
                                    <Grid container> 
                                        <Grid item md={8}>
                                            <ImageList imageList={images} show2Image={true}/>
                                        </Grid>
                                        <Grid item md={4} style={{margin: "0 auto", padding: 15}}>
                                            <CardHeader
                                                avatar={
                                                <Avatar aria-label="recipe">
                                                    R
                                                </Avatar>
                                                }
                                                title="Shrimp and Chorizo Paella"
                                                subheader="September 14, 2016"
                                            />
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <Inbox />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Ngày khởi hành " secondary=" 20-11-2020" />
                                                </ListItem>
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <Drafts />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Địa điểm " secondary="Lý Sơn - Hội An"/>
                                                </ListItem>
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <Drafts />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Lịch Trình " secondary="2 Ngày - 2 đêm"/>
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </Grid>
                                    <div class="volunteer-info">
                                        <Typography variant="h5">
                                            Thông tin chung
                                        </Typography>
                                        <List component="nav" aria-label="main mailbox folders">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <DoneOutline style={{color:"#A5DEC8"}} />
                                                </ListItemIcon>
                                                <ListItemText primary="Tổ chức các lớp học cộng đồng bồi dưỡng kỹ năng, các lớp học tiếng Anh dành cho trẻ ec cộng đồng bồi dưỡng kỹ năng, các lớp học tiếng Anh dành cho trẻ em đm địa phương. "/>
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <DoneOutline style={{color:"#A5DEC8"}} />
                                                </ListItemIcon>
                                                <ListItemText primary="Tổ chức các lớp học cộng đồng bồi dưỡng kỹ năng, các lớp học tiếng Anh dành cho trẻ em địa phương. "/>
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <DoneOutline style={{color:"#A5DEC8"}} />
                                                </ListItemIcon>
                                                <ListItemText primary="Tổ chức các lớp học cộng đồng bồi dưỡng kỹ năng, các lớp học tiếng Anh dành cho trẻ em địa phương. "/>
                                            </ListItem>
                                        </List>
                                    </div>
                                    <Grid container>
                                        <Grid item md={4}>
                                            <Timeline align="right">
                                                {date.map((item, index) => (
                                                    <TimelineItem key={index}>
                                                        <TimelineSeparator>
                                                            <TimelineDot className={index === idx ? classes.activeDot : classes.unactiveDot} />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                                {item}
                                                            </Button>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                ))}
                                            </Timeline>
                                        </Grid>
                                        <Grid item md={8}>
                                        {
                                            schedule[idx].map((item, index) => (
                                                <>
                                                    <Typography>Lịch trình ngày: 2</Typography>
                                                    <List component="nav" aria-label="main mailbox folders">
                                                        <ListItem button>
                                                            <ListItemIcon>
                                                                <RadioButtonUnchecked style={{color:"#A5DEC8"}} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.time}/>
                                                            <ListItemText primary={item.activity}/>
                                                        </ListItem>
                                                    </List>
                                                </>
                                            ))
                                        }
                                        </Grid>
                                    </Grid>
                                </div>
                }
            </Grid>
        </Grid>
    )
}
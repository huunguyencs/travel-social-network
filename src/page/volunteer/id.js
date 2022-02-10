import { Avatar, Grid, CardHeader,List,Radio,ListItem, ListItemIcon, ListItemText,RadioGroup, FormControlLabel } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { Drafts, Inbox,DoneOutline,RadioButtonUnchecked,ChevronLeft, ChevronRight, } from '@material-ui/icons';
import React, { useState,useContext } from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import LeftBar from '../../components/leftbar/LeftBar';
import { NotFound } from "../404";
import { Button, CircularProgress, Typography,IconButton } from '@material-ui/core';
import SpeedDialButton from '../../components/speedDialBtn';
import { homeMenu } from '../../constant/menu';
import ImageList from '../../components/modal/ImageList';
import { volunteerDetailStyles } from '../../style';
import { eventStyles } from "../../style";

function LeftArrow(props) {

    const classes = eventStyles();

    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
        <div disabled={isFirstItemVisible} >
            <IconButton className={classes.arrow} onClick={() => scrollPrev()} size="small">
                <ChevronLeft />
            </IconButton>
        </div>
    )
}

function RightArrow(props) {

    const classes = eventStyles();


    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
        <div disabled={isLastItemVisible} >
            <IconButton className={classes.arrow} onClick={() => scrollNext()} size="small">
                <ChevronRight />
            </IconButton>
        </div>
    )
}

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
    const locations =[
        "Lý Sơn",
        "Hội An",
        "Mỹ Khê"
    ]
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
    const schedule= [
        [{
            time: "9h-10h",
            activity: "Tổ chức các lớp học cộng đồng bồi dưỡng kỹ năng, các lớp học tiếng Anh dành cho trẻ ec cộng đồng bồi dưỡng kỹ năng, các lớp học tiếng Anh dành cho trẻ em đm địa phương."
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
    const [idxLocation, setIdxLocation] = useState(0);
    const classes = volunteerDetailStyles();
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
                                    <Typography className={classes.volunteerDetailTitle}>Du Lịch tình nguyện</Typography>
                                    <Grid container> 
                                        <Grid item md={7}>
                                            <ImageList imageList={images} show2Image={true}/>
                                        </Grid>
                                        <Grid item md={5} style={{margin: "0 auto", padding: 15}}>
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
                                    <div className={classes.volunteerInfo}>
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
                                    <div>
                                        <Typography variant="h5">
                                            Lịch trình
                                        </Typography>
                                        <Grid container>
                                            <Grid item md={3} >
                                                <div className={classes.timeline}>
                                                    <Timeline align="right" >
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
                                                </div>
                                                <div className={classes.smallTimeline}>
                                                    <div className={classes.timelineWrap}>
                                                        {date.map((item, index) => (
                                                            <Button key={index} className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                                {item}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item md={9}>
                                            <Typography>Lịch trình ngày: {idx}</Typography>
                                            {
                                                schedule[idx].map((item, index) => (
                                                    <>
                                            
                                                        <List component="nav" aria-label="main folders">
                                                            <ListItem button className={classes.scheduleItem}>
                                                                <ListItemIcon>
                                                                    <RadioButtonUnchecked style={{color:"#A5DEC8"}} />
                                                                </ListItemIcon>
                                                                <ListItemText primary={item.time} style={{minWidth:"80px"}} />
                                                                <ListItemText primary={item.activity}/>
                                                            </ListItem>
                                                        </List>
                                                    </>
                                                ))
                                            }
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.volunteerRegister}>
                                        <Typography variant="h5">
                                            Đăng ký tham gia
                                        </Typography>
                                        <div className={classes.registerAll}>
                                            <Typography variant="h7">
                                                Đăng ký tham gia tất cả các địa điểm trong hoạt động
                                            </Typography>
                                            <table className={classes.registerTable}>
                                                <tr>
                                                    <th className={classes.registerTableTitle}>Điểm khởi hành</th>
                                                    <th className={classes.registerTableTitle}>Ngày khởi hành</th>
                                                    <th className={classes.registerTableTitle}>Tổng chi phí tiêu chuẩn</th>
                                                </tr>
                                                <tr>
                                                    <td className={classes.registerTableData}>Tp Hồ Chí Minh</td>
                                                    <td className={classes.registerTableData}>24-06-2022</td>
                                                    <td className={classes.registerTableData}>
                                                        <div className={classes.registerTableBooking}>
                                                            <p>1,990,000đ</p>
                                                            <Button className={classes.registerTableBookingButton}>
                                                                Đăng ký ngay
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={classes.registerItem}>
                                            <Typography variant="h7">
                                                Đăng ký tham gia từng địa điểm trong hoạt động
                                            </Typography>
                                            <Grid container>
                                                <Grid item md={3} >
                                                    <div className={classes.timeline}>
                                                        <Timeline align="right" >
                                                            {locations.map((item, index) => (
                                                                <TimelineItem key={index}>
                                                                    <TimelineSeparator>
                                                                        <TimelineDot className={index === idxLocation ? classes.activeDot : classes.unactiveDot} />
                                                                        <TimelineConnector />
                                                                    </TimelineSeparator>
                                                                    <TimelineContent>
                                                                        <Button className={index === idxLocation ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdxLocation(index)}>
                                                                            {item}
                                                                        </Button>
                                                                    </TimelineContent>
                                                                </TimelineItem>
                                                            ))}
                                                        </Timeline>
                                                    </div>
                                                    <div className={classes.smallTimeline}>
                                                        <div className={classes.timelineWrap}>
                                                            {date.map((item, index) => (
                                                                <Button key={index} className={index === idxLocation ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdxLocation(index)}>
                                                                    {item}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item md={9}>
                                                    <Typography>Thông tin: </Typography>
                                                    {
                                                        schedule[idxLocation].map((item, index) => (
                                                            <>
                                                                <List component="nav" aria-label="main folders">
                                                                    <ListItem button className={classes.scheduleItem}>
                                                                        <ListItemIcon>
                                                                            <RadioButtonUnchecked style={{color:"#A5DEC8"}} />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={item.activity}/>
                                                                    </ListItem>
                                                                </List>
                                                            </>
                                                        ))
                                                    }
                                                    <div className={classes.registerItemBooking}>
                                                        <div>
                                                            <Typography>
                                                                Nơi ở do người tổ chức sắp xếp
                                                            </Typography>
                                                            <RadioGroup id="gender"  row aria-label="gender" name="gender">
                                                                <FormControlLabel value="No" control={<Radio color="primary" />} label="Có" />
                                                                <FormControlLabel value="no" control={<Radio color="primary" />} label="Không" />
                                                            </RadioGroup>
                                                        </div>
                                                        <Button className={classes.registerItemBookingButton}>
                                                            Đăng ký ngay
                                                        </Button>
                                                       
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <div className={classes.volunteerOther}>
                                        <Typography variant="h5">
                                            Các hoạt động khác
                                        </Typography>
                                        {data.length > 0 ? <ScrollMenu
                                            LeftArrow={LeftArrow}
                                            RightArrow={RightArrow}
                                        >
                                            {data.map((item) =>
                                                <Card style={{width: 350,
                                                    margin: 10}}
                                                tabIndex={0}>
                                                    <CardActionArea>
                                                    <CardMedia
                                                        style={{height: 240}}
                                                        image={item.image}
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h7" component="h3">
                                                        {item.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.description}
                                                        </Typography>
                                                    </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>
                                                    <Button size="small" color="primary">
                                                        Xem chi tiết
                                                    </Button>
                                                    </CardActions>
                                                </Card>
                                            )}
                                        </ScrollMenu>
                                            :
                                            <div className={classes.center}>
                                                <Typography>Không tìm thấy sự kiện</Typography>
                                            </div>
                                        }
                                    </div>
                                </div>
                }
            </Grid>
        </Grid>
    )
}
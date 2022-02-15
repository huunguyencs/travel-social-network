import { Avatar, Grid, CardHeader,List,Radio,ListItem, ListItemIcon, ListItemText,RadioGroup, FormControlLabel } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { Drafts, Inbox,DoneOutline,RadioButtonUnchecked,ChevronLeft, ChevronRight, } from '@material-ui/icons';
import React, { useEffect, useState,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, CircularProgress, Typography,IconButton } from '@material-ui/core';
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { volunteerDetailStyles } from '../../style';
import ImageList from '../modal/ImageList';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { eventStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { convertDateToStr} from "../../utils/date";
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
export default function TourDetail(props) {

    const [idx, setIdx] = useState(0);
    const [idxLocation, setIdxLocation] = useState(0);
    const classes = volunteerDetailStyles();
    
    const { volunteer, isOwn } = props;
    console.log("data",volunteer)
    return (
        <>
            {
                volunteer ? 
                <div style={{marginTop:80}}>
                    <Typography className={classes.volunteerDetailTitle}>{volunteer.name}</Typography>
                    <Grid container> 
                        <Grid item md={7}>
                            <ImageList imageList={[volunteer.image]} show2Image={true}/>
                        </Grid>
                        <Grid item md={5} style={{margin: "0 auto", padding: 15}}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" src={volunteer.userId.avatar}>
                                    
                                </Avatar>
                                }
                                title={volunteer.userId.fullname}
                            />
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button>
                                    <ListItemIcon>
                                        <Inbox />
                                    </ListItemIcon>
                                    <ListItemText primary="Ngày khởi hành " secondary={convertDateToStr(volunteer.date[0].date)} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Drafts />
                                    </ListItemIcon>
                                    <ListItemText primary="Địa điểm xuất phát" secondary={volunteer.location[0].location.fullname}/>
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
                            {
                                volunteer.descriptions.length >0 ?
                                volunteer.descriptions.map((item)=>(
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DoneOutline style={{color:"#A5DEC8"}} />
                                        </ListItemIcon>
                                        <ListItemText primary={item}/>
                                    </ListItem>
                                ))
                                :
                                <></>
                            }
                            
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
                                        {volunteer.date.map((item, index) => (
                                            <TimelineItem key={index}>
                                                <TimelineSeparator>
                                                    <TimelineDot className={index === idx ? classes.activeDot : classes.unactiveDot} />
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                        {convertDateToStr(item.date)}
                                                    </Button>
                                                </TimelineContent>
                                            </TimelineItem>
                                        ))}
                                    </Timeline>
                                </div>
                                <div className={classes.smallTimeline}>
                                    <div className={classes.timelineWrap}>
                                        {volunteer.date.map((item, index) => (
                                            <Button key={index} className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                {convertDateToStr(item.date)}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={9}>
                            <Typography>Lịch trình ngày: {idx}</Typography>
                            {
                                volunteer.date[idx].activities.map((item, index) => (
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
                                    <td className={classes.registerTableData}>{volunteer.location[0].location.fullname}</td>
                                    <td className={classes.registerTableData}>{convertDateToStr(volunteer.date[0].date)}</td>
                                    <td className={classes.registerTableData}>
                                        <div className={classes.registerTableBooking}>
                                            <p>{volunteer.cost}</p>
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
                                            {volunteer.location.map((item, index) => (
                                                <TimelineItem key={index}>
                                                    <TimelineSeparator>
                                                        <TimelineDot className={index === idxLocation ? classes.activeDot : classes.unactiveDot} />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Button className={index === idxLocation ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdxLocation(index)}>
                                                            {item.location.fullname}
                                                        </Button>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))}
                                        </Timeline>
                                    </div>
                                    <div className={classes.smallTimeline}>
                                        <div className={classes.timelineWrap}>
                                            {volunteer.location.map((item, index) => (
                                                <Button key={index} className={index === idxLocation ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdxLocation(index)}>
                                                    {item.location.fullname}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={9}>
                                    <Typography>Thông tin: </Typography>
                                    {
                                        volunteer.location[idxLocation].description.map((item, index) => (
                                            <>
                                                <List component="nav" aria-label="main folders">
                                                    <ListItem button className={classes.scheduleItem}>
                                                        <ListItemIcon>
                                                            <RadioButtonUnchecked style={{color:"#A5DEC8"}} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={item}/>
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
                    {/* <div className={classes.volunteerOther}>
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
                    </div> */}
                </div>
                :
                <div></div>
            }
        </>
    )
}
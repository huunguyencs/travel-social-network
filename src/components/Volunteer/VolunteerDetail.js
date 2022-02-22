import { Avatar, Grid, CardHeader, List, Radio, ListItem, ListItemIcon, ListItemText, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { DoneOutline, RadioButtonUnchecked, AssistantPhoto, Event, Schedule } from '@material-ui/icons';
import React, { useState } from "react";
import { Button, Typography } from '@material-ui/core';
import { volunteerDetailStyles } from '../../style';
import ImageList from '../Modal/ImageList';

import { convertDateToStr } from "../../utils/date";
import { Link } from 'react-router-dom';

export default function VolunteerDetail(props) {

    const [idx, setIdx] = useState(0);
    const [idxLocation, setIdxLocation] = useState(0);
    const classes = volunteerDetailStyles();

    const { volunteer } = props;
    // console.log("data", volunteer)
    return (
        <>
            {
                volunteer ?
                    <div style={{ marginTop: 80 }}>
                        <Typography variant='h4' className={classes.volunteerDetailTitle}>{volunteer.name}</Typography>
                        <Grid container>
                            <Grid item md={5}>
                                <ImageList imageList={[volunteer.image]} show2Image={false} defaultHeight={300} />
                            </Grid>
                            <Grid item md={5} style={{ margin: "0 auto", padding: 15 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" src={volunteer.userId.avatar} />
                                    }
                                    title={
                                        <Typography component={Link} to={`/u/${volunteer.userId._id}`} className={classes.username}>
                                            {volunteer.userId.fullname}
                                        </Typography>
                                    }
                                />
                                <List component="nav" aria-label="main mailbox folders" className={classes.listTitle}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Event />
                                        </ListItemIcon>
                                        <ListItemText primary="Ngày khởi hành " secondary={convertDateToStr(volunteer.date[0].date)} />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssistantPhoto />
                                        </ListItemIcon>
                                        <ListItemText primary="Địa điểm xuất phát" secondary={volunteer.location[0].location.fullname} />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Schedule />
                                        </ListItemIcon>
                                        <ListItemText primary="Lịch Trình " secondary="2 Ngày - 2 đêm" />
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
                                    volunteer.descriptions.length > 0 ?
                                        volunteer.descriptions.map((item, index) => (
                                            <ListItem button key={index}>
                                                <ListItemIcon>
                                                    <DoneOutline style={{ color: "#A5DEC8" }} />
                                                </ListItemIcon>
                                                <ListItemText primary={item} />
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
                                <Grid item md={3} sm={12} xs={12}>
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
                                <Grid item md={9} sm={12} xs={12}>
                                    <Typography>Lịch trình ngày: {idx}</Typography>
                                    {
                                        volunteer.date[idx].activities.map((item, index) => (
                                            <List key={index} component="nav" aria-label="main folders">
                                                <ListItem button className={classes.scheduleItem}>
                                                    <ListItemIcon>
                                                        <RadioButtonUnchecked style={{ color: "#A5DEC8" }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.time} style={{ minWidth: "80px" }} />
                                                    <ListItemText primary={item.activity} />
                                                </ListItem>
                                            </List>
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
                                <Typography variant="body1">
                                    Đăng ký tham gia tất cả các địa điểm trong hoạt động
                                </Typography>
                                <table className={classes.registerTable}>
                                    <thead>
                                        <tr>
                                            <th className={classes.registerTableTitle}>Điểm khởi hành</th>
                                            <th className={classes.registerTableTitle}>Ngày khởi hành</th>
                                            <th className={classes.registerTableTitle}>Tổng chi phí tiêu chuẩn</th>
                                            <th className={classes.registerTableTitle}>Đăng ký</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={classes.registerTableData}>{volunteer.location[0].location.fullname}</td>
                                            <td className={classes.registerTableData}>{convertDateToStr(volunteer.date[0].date)}</td>
                                            <td className={classes.registerTableData}>
                                                <div className={classes.registerTableBooking}>
                                                    <p>{volunteer.cost}</p>

                                                </div>
                                            </td>
                                            <td className={classes.registerTableData}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Button className={classes.registerTableBookingButton}>
                                                        Đăng ký ngay
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={classes.registerItem}>
                                <Typography variant="body1">
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

                                                <List key={index} component="nav" aria-label="main folders">
                                                    <ListItem button className={classes.scheduleItem}>
                                                        <ListItemIcon>
                                                            <RadioButtonUnchecked style={{ color: "#A5DEC8" }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={item} />
                                                    </ListItem>
                                                </List>

                                            ))
                                        }

                                        <div className={classes.registerItemBooking}>
                                            <div>
                                                <Typography>
                                                    Nơi ở do người tổ chức sắp xếp
                                                </Typography>
                                                <RadioGroup id="gender" row aria-label="gender" name="gender">
                                                    <FormControlLabel value="No" control={<Radio color="primary" />} label="Có" />
                                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="Không" />
                                                </RadioGroup>
                                            </div>
                                            <div>
                                                <Button className={classes.registerItemBookingButton}>
                                                    Đăng ký ngay
                                                </Button>
                                            </div>

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
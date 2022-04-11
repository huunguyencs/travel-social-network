import { Box, Avatar, Grid, CardHeader, List, Radio, ListItem, ListItemIcon, ListItemText, RadioGroup, FormControlLabel, CircularProgress, DialogActions, DialogContent, Dialog, DialogTitle, Collapse, IconButton, FormControl, Modal, Backdrop, Tabs, Tab } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import PropTypes from 'prop-types';
import { DoneOutline, RadioButtonUnchecked, AssistantPhoto, Event, Schedule, ArrowDropDown, ArrowDropUp, Close, CheckCircle } from '@material-ui/icons';
import React, { useState, useEffect } from "react";
import { Button, Typography } from '@material-ui/core';
import { volunteerDetailStyles } from '../../style';
import ImageList from '../Modal/ImageList';
import { joinVolunteerAll, unJoinVolunteerAll, joinVolunteerOne, unJoinVolunteerOne } from '../../redux/callApi/volunteerCall';
import { convertDateToStr } from "../../utils/date";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputComment from "../Input/Comment";
import Comment from "../Comment";
import { loadComment } from '../../redux/callApi/commentCall';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

export default function VolunteerDetail(props) {

    const [idx, setIdx] = useState(0);
    const [idxLocation, setIdxLocation] = useState(0);
    const classes = volunteerDetailStyles();
    const dispatch = useDispatch();
    const { volunteer } = props;
    const { auth } = useSelector(state => state);
    const [isJoinAll, setIsJoinAll] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [loadingJoinALl, setLoadingJoinAll] = useState(false);
    const [isOwn, setIsOwn] = useState(false);
    useEffect(() => {
        if (auth.user && volunteer) {
            setIsOwn(volunteer.userId._id === auth.user._id);
        }
    }, [isOwn, volunteer, auth]);
    const handleShowJoin = () => {
        setShowJoin(true);
    }
    const handleCloseJoin = () => {
        setShowJoin(false);
    }
    const handleJoinAll = () => {
        setLoadingJoinAll(true);
        if (isJoinAll) {
            dispatch(unJoinVolunteerAll(volunteer._id, auth.token, () => {
                setLoadingJoinAll(false);
                setIsJoinAll(false);
            }, () => {
                setLoadingJoinAll(false);
                setIsJoinAll(true);
            }))
        } else {
            dispatch(joinVolunteerAll(volunteer._id, auth.token, () => {
                setLoadingJoinAll(false);
                setIsJoinAll(true);
            }, () => {
                setLoadingJoinAll(false);
                setIsJoinAll(false);
            }))
        }
        handleCloseJoin();
    }
    useEffect(() => {
        if (volunteer.users.length > 0) {
            volunteer.users.forEach(element => {
                if (element._id === auth.user._id) {
                    setIsJoinAll(true);
                    return;
                };
            });
        }
        else {
            setIsJoinAll(false);
        }
    }, [volunteer, auth.user])

    const [loadingComment, setLoadingComment] = useState(false);
    const [showCmt, setShowCmt] = useState(false);
    // const [pageComment, setPageComment] = useState(0);
    const [errorComment, setErrorComment] = useState(false);
    const handleShowCmt = async () => {
        if (!showCmt) {
            if (!volunteer.comments) {
                setLoadingComment(true);
                dispatch(loadComment(volunteer._id, "volunteer", () => {
                    setLoadingComment(false);
                    // setPageComment(1);
                }, () => {
                    setLoadingComment(false);
                    setErrorComment(true);
                }, 0))
            }
        }
        setShowCmt(!showCmt)
    }
    // const loadMoreComment = () => {
    //     setLoadingComment(true);
    //     dispatch(loadComment(volunteer._id, "volunteer", () => {
    //         setLoadingComment(false);
    //         setPageComment(state => state + 1);
    //     }, () => {
    //         setLoadingComment(false);
    //         setErrorComment(true);
    //     }, pageComment))
    // }


    const [accommodation, setAccommodation] = useState('true');
    const handleAccommodation = (e) => {
        setAccommodation(e.target.value)
    }
    const [isJoinOne, setIsJoinOne] = useState(false);
    const [showJoinOne, setShowJoinOne] = useState(false);
    const [loadingJoinOne, setLoadingJoinOne] = useState(false);
    const handleShowJoinOne = () => {
        setShowJoinOne(true);
    }
    const handleCloseJoinOne = () => {
        setShowJoinOne(false);
    }
    const handleJoinOne = () => {
        setLoadingJoinOne(true);
        if (isJoinOne) {
            dispatch(unJoinVolunteerOne(volunteer._id, volunteer.location[idxLocation]._id, { isAccommodation: accommodation === 'true' }, auth.token, () => {
                setLoadingJoinOne(false);
                setIsJoinOne(false);
            }, () => {
                setLoadingJoinOne(false);
                setIsJoinOne(true);
            }))
        } else {
            dispatch(joinVolunteerOne(volunteer._id, volunteer.location[idxLocation]._id, { isAccommodation: accommodation === 'true' }, auth.token, () => {
                setLoadingJoinOne(false);
                setIsJoinOne(true);
            }, () => {
                setLoadingJoinOne(false);
                setIsJoinOne(false);
            }))
        }
        handleCloseJoinOne();
    }

    useEffect(() => {
        if (volunteer.location[idxLocation] && volunteer.location[idxLocation].users.length > 0) {
            volunteer.location[idxLocation].users.forEach(element => {
                if (element.user._id === auth.user._id) {
                    setIsJoinOne(true);
                    return;
                };
            });
        }
        else {
            setIsJoinOne(false);
        }
    }, [volunteer, auth.user, idxLocation])

    const [openDS, setOpenDS] = useState(false);
    const handleOpenDS = () => {
        setOpenDS(true);
      };
    
    const handleCloseDS = () => {
        setOpenDS(false);
    };
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {
                volunteer ?
                    <div style={{ marginTop: 80 }}>
                        <Typography variant='h4' className={classes.volunteerDetailTitle}>{volunteer.name}</Typography>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12}>
                                <ImageList imageList={volunteer.images} show2Image={true} defaultHeight={300} />
                            </Grid>
                            <Grid item md={4} sm={12} xs={12} className={classes.infoVolunteer}>
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
                                            {
                                                isOwn ? <th className={classes.registerTableTitle}>Danh sách đăng ký</th>
                                                :<th className={classes.registerTableTitle}>Đăng ký</th>
                                            }
                                            
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
                                            {
                                                isOwn ? 
                                                <td className={classes.registerTableData}>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button className={classes.registerTableBookingButton} onClick={handleOpenDS}>
                                                            Danh sách
                                                        </Button>
                                                        <Modal
                                                            aria-labelledby="transition-modal-title"
                                                            aria-describedby="transition-modal-description"
                                                            className={classes.modal}
                                                            open={openDS}
                                                            onClose={handleCloseDS}
                                                            closeAfterTransition
                                                            BackdropComponent={Backdrop}
                                                            BackdropProps={{
                                                                timeout: 500,
                                                            }}
                                                            >
                                                                
                                                                <div className={classes.paper}>
                                                                    <div className={classes.modal_header}>
                                                                        <h2 className={classes.modal_header_left}>Danh sách người tham gia: </h2>
                                                                        <div className={classes.modal_header_right}>
                                                                            <IconButton onClick={handleCloseDS} size="small">
                                                                                <Close className={classes.modal_header_closeIcon} />
                                                                            </IconButton>
                                                                        </div>
                                                                    </div>
                                                                    <Tabs
                                                                        value={value}
                                                                        onChange={handleChange}
                                                                        indicatorColor="primary"
                                                                        textColor="primary"
                                                                        centered
                                                                    >
                                                                        <Tab label="Tham gia tất cả" {...a11yProps(0)}/>
                                                                        <Tab label="Từng địa điểm" {...a11yProps(1)}/>
                                                                    </Tabs>
                                                                    <TabPanel value={value} index={0} className={classes.tabPanel}>
                                                                        <div style={{ position: "relative", overflowY: "auto" }}>
                                                                            <ul>
                                                                                {volunteer.users.map((user) => (
                                                                                    <li className={classes.modal_body_user} key={user._id}>
                                                                                        <div className={classes.userWrap}>
                                                                                            <Avatar alt="avatar" src={user.avatar} className={classes.avatar} />
                                                                                            <div className={classes.fullnameWrap}>
                                                                                                <Link to={`/u/${user._id}`} onClick={handleCloseDS} className={classes.fullname}>{user.fullname}</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </TabPanel>
                                                                    <TabPanel value={value} index={1} className={classes.tabPanel}>
                                                                        <div style={{ position: "relative", overflowY: "auto" }}>
                                                                            <ul>
                                                                                {volunteer.location.map((element) => (
                                                                                    element.users.map((item)=>(
                                                                                        <li className={classes.modal_body_user} key={item.user._id}>
                                                                                            <div className={classes.userWrap}>
                                                                                                <Avatar alt="avatar" src={item.user.avatar} className={classes.avatar} />
                                                                                                <div className={classes.fullnameWrap}>
                                                                                                    <Link to={`/u/${item.user._id}`} onClick={handleCloseDS} className={classes.fullname}>{item.user.fullname}</Link>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <p style={{marginTop: 35}}>{element.location.fullname}</p>
                                                                                            </div>
                                                                                            <div>
                                                                                                {
                                                                                                    item.isAccommodation && <CheckCircle style={{color:"#a5dec8", marginTop: 35, marginRight: 20}}/>
                                                                                                }
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </TabPanel>
                                                                    
                                                                </div>
                                                        </Modal>
                                                    </div>
                                                </td>
                                                :
                                                <td className={classes.registerTableData}>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        {
                                                            !isJoinAll ?
                                                                <Button className={classes.registerTableBookingButton} onClick={handleShowJoin}>
                                                                    Đăng ký ngay
                                                                </Button> :
                                                                <Button className={classes.registerTableBookingButton} onClick={handleShowJoin}>
                                                                    Hủy đăng ký
                                                                </Button>
                                                        }
                                                        <Dialog
                                                            open={showJoin}
                                                            onClose={handleCloseJoin}
                                                            aria-labelledby="show-delete-dialog"
                                                            aria-describedby="show-delete-dialog-description"
                                                        >
                                                            {
                                                                !isJoinAll ? <>
                                                                    <DialogTitle id="alert-dialog-title">{"Bạn muốn đăng ký tham gia hoạt động?"}</DialogTitle>
                                                                    <DialogContent>Hãy đọc kỹ chi tiết hoạt động</DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={handleCloseJoin}>
                                                                            Hủy
                                                                        </Button>
                                                                        <Button onClick={handleJoinAll} className={classes.delete}>
                                                                            {
                                                                                loadingJoinALl ? <CircularProgress size={15} color='inherit' /> : "Đăng ký"
                                                                            }
                                                                        </Button>
                                                                    </DialogActions></> :
                                                                    <>
                                                                        <DialogTitle id="alert-dialog-title">{"Bạn muốn hủy tham gia hoạt động?"}</DialogTitle>
                                                                        <DialogActions>
                                                                            <Button onClick={handleCloseJoin}>
                                                                                Hủy
                                                                            </Button>
                                                                            <Button onClick={handleJoinAll} className={classes.delete}>
                                                                                {
                                                                                    loadingJoinALl ? <CircularProgress size={15} color='inherit' /> : "Hủy đăng ký"
                                                                                }
                                                                            </Button>
                                                                        </DialogActions></>
                                                            }
                                                        </Dialog>
                                                    </div>
                                                </td>
                                            }
                                            
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
                                            <List  component="nav" aria-label="main folders">
                                            {
                                                volunteer.location[idxLocation] && volunteer.location[idxLocation].description.map((item, index) => (
                                                        <ListItem key={index} button className={classes.scheduleItem}>
                                                            <ListItemIcon>
                                                                <RadioButtonUnchecked style={{ color: "#A5DEC8" }} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item} />
                                                        </ListItem>
                                                
                                                ))
                                            }
                                            </List>
                                        
                                        {
                                            (!isJoinAll && !isOwn) &&
                                            <div className={classes.registerItemBooking}>
                                                {
                                                    !isJoinOne &&
                                                    <div>
                                                        <FormControl component="fieldset">
                                                            <Typography>
                                                                Nơi ở do người tổ chức sắp xếp
                                                            </Typography>

                                                            <RadioGroup row aria-label="accommodation" name="accommodation" value={accommodation} onChange={handleAccommodation}>
                                                                <FormControlLabel value={'true'} control={<Radio color="primary" />} label="Có" />
                                                                <FormControlLabel value={'false'} control={<Radio color="primary" />} label="Không" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                }
                                                <div>
                                                    {
                                                        !isJoinOne ?
                                                            <Button className={classes.registerTableBookingButton} onClick={handleShowJoinOne}>
                                                                Đăng ký ngay
                                                            </Button> :
                                                            <Button className={classes.registerTableBookingButton} onClick={handleShowJoinOne}>
                                                                Hủy đăng ký
                                                            </Button>
                                                    }
                                                    <Dialog
                                                        open={showJoinOne}
                                                        onClose={handleCloseJoinOne}
                                                        aria-labelledby="show-delete-dialog"
                                                        aria-describedby="show-delete-dialog-description"
                                                    >
                                                        {
                                                            !isJoinOne ? <>
                                                                <DialogTitle id="alert-dialog-title">{"Bạn muốn đăng ký tham gia địa điểm này?"}</DialogTitle>
                                                                <DialogContent>Hãy đọc kỹ chi tiết các hoạt động của địa điểm</DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={handleCloseJoinOne}>
                                                                        Hủy
                                                                    </Button>
                                                                    <Button onClick={handleJoinOne} className={classes.delete}>
                                                                        {
                                                                            loadingJoinOne ? <CircularProgress size={15} color='inherit' /> : "Đăng ký"
                                                                        }
                                                                    </Button>
                                                                </DialogActions></> :
                                                                <>
                                                                    <DialogTitle id="alert-dialog-title">{"Bạn muốn hủy tham gia hoạt động?"}</DialogTitle>
                                                                    <DialogActions>
                                                                        <Button onClick={handleCloseJoinOne}>
                                                                            Hủy
                                                                        </Button>
                                                                        <Button onClick={handleJoinOne} className={classes.delete}>
                                                                            {
                                                                                loadingJoinOne ? <CircularProgress size={15} color='inherit' /> : "Hủy đăng ký"
                                                                            }
                                                                        </Button>
                                                                    </DialogActions></>
                                                        }
                                                    </Dialog>
                                                </div>
                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.comments}>
                            <Typography variant="h5">
                                Bình luận
                                {
                                    showCmt ?
                                        <IconButton onClick={handleShowCmt} className={classes.buttonShowCmt}>
                                            <ArrowDropUp />
                                        </IconButton> :
                                        <IconButton onClick={handleShowCmt} className={classes.buttonShowCmt}>
                                            <ArrowDropDown />
                                        </IconButton>

                                }

                            </Typography>
                            <Collapse className={classes.cmt} in={showCmt}>
                                <hr className={classes.line} />
                                <div className={classes.listCmt}>
                                    {volunteer.comments && volunteer.comments.map((cmt) => (
                                        <Comment comment={cmt} key={cmt._id} id={volunteer._id} type="volunteer" />
                                    ))}
                                </div>
                                {loadingComment && <Typography>Đang tải...</Typography>}
                                {errorComment && <Typography>Có lỗi xảy ra</Typography>}
                                {/* {volunteer.comments && !loadingComment && volunteer.comments?.length < volunteer.comments?.length &&
                                    <Typography variant="body2" onClick={loadMoreComment}>Xem thêm bình luận</Typography>
                                } */}
                            </Collapse>
                            <div className={classes.wrapInput}>
                                <InputComment type="volunteer" id={volunteer._id} />
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                            <Typography>Có lỗi xảy ra</Typography>
                            <Button >Thử lại</Button>
                        </div>
                    </div>
            }
        </>
    )
}
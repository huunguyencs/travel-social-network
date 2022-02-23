import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { addVolunteerStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddImageHorizontal from '../Input/AddImageHorizontal';
import { Close,AddCircle } from '@material-ui/icons';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { convertDateToStr } from "../../utils/date";
import {  List, ListItem, ListItemIcon, ListItemText, FormControlLabel } from '@material-ui/core';
import { DoneOutline, RadioButtonUnchecked, AssistantPhoto, Event, Schedule } from '@material-ui/icons';

function Item(props) {

    const { item, handleRemove } = props;

    const classes = addVolunteerStyles();

    return (
        <div className={classes.itemContainer}>
            <Typography>{item}</Typography>
            <IconButton size="small" onClick={() => handleRemove()}>
                <Close />
            </IconButton>
        </div>
    )
}
export default function AddVolunteer(props) {
    const classes = addVolunteerStyles();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { auth, location } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [images, setImages] = useState([]);
    const [tempDescription, setTempDescription] = useState("");
    const [context, setContext] = useState({
        name: "",
        descriptions: [],
        cost: ""
    });
    const [dateVolunteer, setDateVolunteer] = useState([{
        activities: [],
        accommodation: "",
        date: null
    }]);
    const handleAddDescription = (e) => {
        e.preventDefault();
        setContext({
            ...context,
            descriptions: [...context.descriptions, tempDescription]
        })
        setTempDescription('')
    }

    const handleRemoveDescription = (idx) => {
        setContext({
            ...context,
            descriptions: [
                ...context.descriptions.slice(0, idx),
                ...context.descriptions.slice(idx + 1)
            ]
        })
    }
    const handleChange = (e) => {
        setContext({
            ...context,
            [e.target.name]: e.target.value
        })
    }

    const [idx, setIdx] = useState(0);
    const handleAddDay = () => {
        setDateVolunteer([
            ...dateVolunteer,dateVolunteer[0]
        ])
    }
    const handleDeleteDay =() =>{
        setDateVolunteer([
            ...dateVolunteer.slice(0,idx),
            ...dateVolunteer.slice(idx+1)
        ])
    }
    return(
        <div className={classes.formContainer}>
            <Typography variant='h5' style={{marginTop: 50}}>Tạo hoạt động tình nguyện của bạn</Typography>
            <TextField
                label="Tên hoạt động"
                variant="outlined"
                name="name"
                required
                className={classes.fullField}
                onChange={handleChange}
                value={context.name}
            />
            <AddImageHorizontal
                images={images}
                onChange={setImages}
                className={classes.fullField}
                maxImage={10}
            />
            <Typography>Các thông tin chung</Typography>
            <Grid container>
                {context.descriptions.map((item, index) => (
                    <Grid item md={6} sm={12} xs={12} key={index}>
                        <Item item={item} handleRemove={() => handleRemoveDescription(index)} />
                    </Grid>
                ))}
            </Grid>
            <form
                onSubmit={handleAddDescription}
                className={classes.formAdd}
            >
                <TextField
                    label="Thông tin chung"
                    variant="outlined"
                    name="description"
                    className={classes.fullField}
                    onChange={(e) => setTempDescription(e.target.value)}
                    value={tempDescription}
                />
                <Button
                    type="submit"
                    disabled={!tempDescription}
                    variant='contained'
                    color="primary"
                >
                    Thêm
                </Button>
            </form>
            <div>
                <Typography variant="h5">
                    Tạo Lịch trình
                </Typography>
                <Grid container>
                    <Grid item md={3} sm={12} xs={12}>
                        <div className={classes.timeline}>
                            <Timeline align="right" >
                                {dateVolunteer.map((item, index) => (
                                    <TimelineItem key={index}>
                                        <TimelineSeparator>
                                            <TimelineDot className={index === idx ? classes.activeDot : classes.unactiveDot} />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <div style={{display:"flex"}}>
                                                <IconButton size="small" onClick={() => handleDeleteDay()}>
                                                    <Close />
                                                </IconButton>
                                                <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                    {convertDateToStr(item.date)}
                                                </Button>
                                            </div>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </div>
                        <div className={classes.addDayWrap}>
                        <IconButton size="small" onClick={() => handleAddDay()}>
                            <AddCircle />
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography>Lịch trình ngày: {idx}</Typography>
                        {
                            dateVolunteer[idx].activities.map((item, index) => (
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
        </div>
    )
}
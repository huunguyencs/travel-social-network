import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Popper, ClickAwayListener,MenuList,Paper,Button,Dialog, DialogActions, DialogContent, DialogTitle,CircularProgress,MenuItem} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteVolunteer } from '../../redux/callApi/volunteerCall';
import { volunteerStyles } from '../../style';
import { convertDateToStr, timeAgo } from '../../utils/date';
import { useDispatch, useSelector } from 'react-redux';

export default function VolunteerCard(props) {

    const { volunteer } = props;
    const {auth, socket} = useSelector(state =>state);
    const classes = volunteerStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    // const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const handleShowMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    // const handleCloseEdit = () => {
    //     setShowEdit(false);
    //     handleCloseMenu();
    // }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
        handleCloseMenu();
    }

    const handleDeleteVolunteer = () => {
        setState({
            loading: true,
            error: false,
        })
        dispatch(deleteVolunteer(volunteer, auth.token, socket, () => {
            setState({
                loading: false,
                error: false
            })
            handleCloseDelete();
            handleCloseMenu();
        }, () => {
            setState({
                loading: false,
                error: true
            })
        }));

    }

    // const handleShowEdit = () => {
    //     setShowEdit(true)
    // }
   
    return (
        <Card className={classes.root}>
            <CardMedia
                image={volunteer.images[0]}
                title={volunteer.name}
                className={classes.media}
            />
            <CardHeader
                avatar={
                    <Avatar
                        alt={volunteer.userId.fullname}
                        src={volunteer.userId.avatar}
                        aria-label='avatar'
                    />
                }
                action={
                    <>
                        {
                            auth.user && auth.user._id === volunteer.userId._id && <>
                                <IconButton
                                    aria-label="settings"
                                    onClick={handleShowMenu}
                                    className={classes.action}
                                    size='small'
                                    controls={anchorEl ? "post-menu" : undefined}
                                >
                                    <MoreVert />
                                </IconButton>
                                <Popper
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseMenu}
                                    disablePortal
                                >
                                    <ClickAwayListener onClickAway={handleCloseMenu}>
                                        <Paper>
                                            <MenuList>
                                                <MenuItem component={Link} to={`/createvolunteer?id=${volunteer._id}`}>Chỉnh sửa bài viết</MenuItem>
                                                <MenuItem onClick={handleShowDelete}>Xóa bài viết</MenuItem>
                                                <Dialog
                                                    open={showDelete}
                                                    onClose={handleCloseDelete}
                                                    aria-labelledby="show-delete-dialog"
                                                    aria-describedby="show-delete-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                                    <DialogContent>Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!</DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleCloseDelete}>
                                                            Hủy
                                                        </Button>
                                                        <Button onClick={handleDeleteVolunteer} className={classes.delete}>
                                                            {
                                                                state.loading ?
                                                                    <CircularProgress size={15} color='inherit' /> : "Xóa"
                                                            }
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </MenuList>
                                        </Paper>
                                    </ClickAwayListener>

                                    {/* </Grow> */}
                                </Popper>
                            </>
                        }
                    </>
                }
                title={
                    <Typography className={classes.username} component={Link} to={`/u/${volunteer.userId._id}`}>
                        {volunteer.userId.fullname}
                    </Typography>
                }
                subheader={
                    <Typography className={classes.subheader}>
                        {timeAgo(new Date(volunteer.createdAt))}
                    </Typography>
                }
            />
            <CardContent>
                <Typography component={Link} to={`/volunteer/${volunteer._id}`} className={classes.name}>
                    {volunteer.name}
                </Typography>
                <Typography>Thời gian: {convertDateToStr(volunteer.date[0].date)}</Typography>
                <Typography>Địa điểm xuất phát: {volunteer.location[0].location.fullname}</Typography>
                <Typography>Thể loại: {volunteer.type}</Typography>
            </CardContent>
        </Card>
    )
}

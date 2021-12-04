import { Avatar, Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeJoin } from "../../redux/callApi/tourCall";
import { modalListStyles } from "../../style";


export default function ManageUserJoin(props) {

    const { tourId, title, handleClose, updateJoin } = props;
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [listUser, setListUser] = useState(props.listUser);

    const classes = modalListStyles();

    const handleRemove = (user) => {
        // console.log(user);
        let prevJoin = listUser;
        let newJoin = listUser.filter(u => u._id !== user);
        updateJoin(newJoin);
        setListUser(newJoin);
        dispatch(removeJoin(tourId, user, auth.token, () => updateJoin(prevJoin)));
    }

    return (
        <div className={classes.paper}>
            <div className={classes.modal_header}>
                <h2 className={classes.modal_header_left}>{title}</h2>
                <div className={classes.modal_header_right}>
                    <IconButton>
                        <Close className={classes.modal_header_closeIcon} onClick={handleClose} />
                    </IconButton>
                </div>
            </div>
            <ul>
                {listUser && listUser.map((user) => (
                    <li button className={classes.modal_body_user} key={user._id}>
                        <div className={classes.avatar}>
                            <Avatar alt="avatar" src={user.avatar} />
                        </div>
                        <div className={classes.fullname}>
                            <Link to={`/profile/${user._id}`} onClick={handleClose}>{user.fullname}</Link>
                        </div>
                        <div>
                            {
                                auth.user._id !== user._id &&
                                <Button variant="outlined" className={classes.modal_body_user_button} onClick={() => handleRemove(user._id)}>
                                    Xóa
                                </Button>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
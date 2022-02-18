import React, { useEffect, useState } from "react";
import { TextField, Button, Radio, CircularProgress, Backdrop, Modal, Fade, IconButton, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { RadioGroup, FormControlLabel } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';

import Validator, { username, validatePhoneNumber } from "../../utils/validator";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { profileStyles } from "../../style";
import { changeInfo } from "../../redux/callApi/authCall";
import ChangeImage from "./changeImage";


export default function ConfirmAccount(props) {

    
    const classes = profileStyles();

    useEffect(() => {
        document.title = "Thay đổi thông tin";
    }, []);
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [errorServer, setErrorServer] = useState(null);
    const [errors, setErrors] = useState({});
    const [context, setContext] = useState({
    })
    const handleInput = (e) => {
        setContext({
            ...context,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmit(true);
    }

    const [showChangeFront, setShowChangeFront] = useState(false);

    const handleShowChangeFront = () => {
        setShowChangeFront(true)
    }
    const handleCloseChangeFront = () => {
        setShowChangeFront(false);
    }

    const [showChangeBack, setShowChangeBack] = useState(false);

    const handleShowChangeBack = () => {
        setShowChangeBack(true)
    }
    const handleCloseChangeBack = () => {
        setShowChangeBack(false);
    }
    const [showChangeWith, setShowChangeWith] = useState(false);

    const handleShowChangeWith = () => {
        setShowChangeWith(true)
    }
    const handleCloseChangeWith = () => {
        setShowChangeWith(false);
    }
    return (
        <div className={classes.confirmAccount}>
            <Typography variant="h5">Xác minh tài khoản</Typography>
            <Typography >Bạn cần xác minh tài khoản để bảo mật cũng như tạo uy tín trong cộng đồng</Typography>
            <div className={classes.confirm_form}>
                <form >
                    <TextField
                        value={context}
                        label="Số CMND/CCCD/Hộ chiếu"
                        variant="outlined"
                        name="cmnd_number"
                        className={classes.input_cmnd_number}
                        required
                    />
                    <Typography>Ảnh chụp phải rõ nét, không bị mờ</Typography>
                    <Typography >CMND/CCCD/Hộ chiếu <span className={classes.cmnd_textStrong}>mặt trước</span>: </Typography>
                    <div className={classes.cmnd_front}>
                        <div className={classes.cmnd_front_upload}>
                            <IconButton className={classes.cmnd_icon_upload} onClick={handleShowChangeFront}>
                                <PhotoCamera/>
                            </IconButton>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={showChangeFront}
                                onClose={handleCloseChangeFront}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade >
                                    <ChangeImage title={"CMND/CCCD/Hộ chiếu mặt trước"} img="abc"  type='cmnd_front' handleClose={handleCloseChangeFront}/>
                                </Fade>
                            </Modal>
                        </div>
                        <img className={classes.cmnd_front_image} src="https://res.cloudinary.com/huunguyencs/image/upload/v1638075905/background_wwpwxy.jpg" alt="cover" />
                    </div>
                    
                    <Typography >CMND/CCCD/Hộ chiếu <span className={classes.cmnd_textStrong}>mặt sau</span>: </Typography>
                    <div className={classes.cmnd_front}>
                        <div className={classes.cmnd_front_upload}>
                            <IconButton className={classes.cmnd_icon_upload} onClick={handleShowChangeBack}>
                                <PhotoCamera />
                            </IconButton>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={showChangeBack}
                                onClose={handleCloseChangeBack}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade >
                                    <ChangeImage title={"CMND/CCCD/Hộ chiếu mặt sau"} img="abc"  type='cmnd_back' handleClose={handleCloseChangeBack}/>
                                </Fade>
                            </Modal>
                        </div>
                        <img className={classes.cmnd_front_image} src="https://res.cloudinary.com/huunguyencs/image/upload/v1638075905/background_wwpwxy.jpg" alt="cover" />
                    </div>
                    <Typography >Chụp ảnh cùng CMND/CCCD/Hộ chiếu: </Typography>
                    <div className={classes.cmnd_front}>
                        <div className={classes.cmnd_front_upload}>
                            <IconButton className={classes.cmnd_icon_upload} onClick={handleShowChangeWith}>
                                <PhotoCamera />
                            </IconButton>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={showChangeWith}
                                onClose={handleCloseChangeWith}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade >
                                    <ChangeImage title={"Chụp ảnh cùng CMND/CCCD/Hộ chiếu"} img="abc" type='cmnd_with' handleClose={handleCloseChangeWith}/>
                                </Fade>
                            </Modal>
                        </div>
                        <img className={classes.cmnd_front_image} src="https://res.cloudinary.com/huunguyencs/image/upload/v1638075905/background_wwpwxy.jpg" alt="cover" />
                    </div>
                    <div className="login-group">
                            <Button
                                variant="contained"
                                // color="primary"
                                type="submit"
                                className="login-button"
                            >
                                {
                                    loading ?
                                        <CircularProgress size="25px" style={{ color: "white" }} />
                                        : "Cập nhật"
                                }
                            </Button>
                        </div>
                </form>
            </div>
        </div>
    )
}

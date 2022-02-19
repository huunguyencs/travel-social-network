import React, { useEffect, useState } from "react";
import { TextField, Button, Radio, CircularProgress, Backdrop, Modal, Fade, IconButton, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { RadioGroup, FormControlLabel } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';

import Validator, { username, validatePhoneNumber } from "../../utils/validator";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { profileStyles } from "../../style";
import { confirmAccount } from "../../redux/callApi/authCall";
import { checkImage } from "../../utils/uploadImage";

export default function ConfirmAccount(props) {

    
    const classes = profileStyles();

    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);
    const [imageFront, setImageFront] = useState();
    const [imageBack, setImageBack] = useState();
    const [imageFace, setImageFace] = useState();
    const [state, setState] = useState({
        loading: false,
        error: null
    })
    const [text, setText] = useState("");
    
    const handleChange = e => {
        setText(e.target.value);
    }
    const handleChangeImageFront = (e) => {
        let error = "";
        
        const check = checkImage(e.target.files[0]);
        if (check !== "") {
            error = check;
        }
        if (error === "") {
            setState({
                ...state,
                error: null
            })
            setImageFront(e.target.files[0])
        }
        else
            setState({
                ...state,
                error: error
            })
    }
    const handleChangeImageBack = (e) => {
        let error = "";
        
        const check = checkImage(e.target.files[0]);
        if (check !== "") {
            error = check;
        }
        console.log("error", error)
        if (error === "") {
            setState({
                ...state,
                error: null
            })
            setImageBack(e.target.files[0])
        }
        else
            setState({
                ...state,
                error: error
            })
    }
    const handleChangeImageFace = (e) => {
        let error = "";
        
        const check = checkImage(e.target.files[0]);
        if (check !== "") {
            error = check;
        }
        if (error === "") {
            setState({
                ...state,
                error: null
            })
            setImageFace(e.target.files[0])
        }
        else
            setState({
                ...state,
                error: error
            })
    }
    const removeImageFront = () => {
        setImageFront()
    }
    const removeImageBack= () => {
        setImageBack()
    }
    const removeImageFace = () => {
        setImageFace()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("front", imageFront)
        console.log("back", imageBack)
        console.log("face", imageFace)
        console.log("text", text)
        if (text !== '' && imageFront!= null && imageBack != null && imageFace != null) {
            setState({
                loading: true,
                error: null
            })
            dispatch(confirmAccount(token, { cmnd: text, cmndFront: imageFront, cmndBack: imageBack, cmndFace: imageFace }, () => {
                setState({
                    loading: false,
                    error: null,
                })
                // history.push("/");
            }, (err) => {
                setState({
                    loading: false,
                    error: err
                })
            }));

        }
    }

    return (
        <div className={classes.confirmAccount}>
            <Typography variant="h5">Xác minh tài khoản</Typography>
            <Typography >Bạn cần xác minh tài khoản để bảo mật cũng như tạo uy tín trong cộng đồng</Typography>
            <div className={classes.confirm_form}>
                <form >
                    <TextField
                        value={text}
                        label="Số CMND/CCCD/Hộ chiếu"
                        variant="outlined"
                        name="cmnd_number"
                        className={classes.input_cmnd_number}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <Typography>Ảnh chụp phải rõ nét, không bị mờ</Typography>
                    <Typography >CMND/CCCD/Hộ chiếu <span className={classes.cmnd_textStrong}>mặt trước</span>: </Typography>
                    <div className={classes.cmnd_front}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="image-front"
                            name="image_front"
                            type="file"
                            onChange={handleChangeImageFront}
                        />
                        <label htmlFor="image-front" className={classes.cmnd_front_upload} >
                            <IconButton variant="raised" component="span">
                                <PhotoCamera titleAccess="Thêm ảnh" />
                            </IconButton>
                        </label>
                        {
                            imageFront && <img  
                            className={classes.cmnd_front_image}
                            src={URL.createObjectURL(imageFront)}
                            title="Xóa"
                            onClick={() => removeImageFront()}
                            />
                        }
                    </div>
                    
                    <Typography >CMND/CCCD/Hộ chiếu <span className={classes.cmnd_textStrong}>mặt sau</span>: </Typography>
                    <div className={classes.cmnd_front}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="image-back"
                            name="image_back"
                            type="file"
                            onChange={handleChangeImageBack}
                        />
                        <label htmlFor="image-back" className={classes.cmnd_front_upload}>
                            <IconButton variant="raised" component="span">
                                <PhotoCamera titleAccess="Thêm ảnh" />
                            </IconButton>
                        </label>
                        {
                            imageBack && <img 
                            className={classes.cmnd_front_image}
                            src={URL.createObjectURL(imageBack)}
                            title="Xóa"
                            onClick={() => removeImageBack()}
                            />
                        }
                    </div>
                    <Typography >Chụp ảnh cùng CMND/CCCD/Hộ chiếu: </Typography>
                    <div className={classes.cmnd_front}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="image-face"
                            name="image_face"
                            type="file"
                            onChange={handleChangeImageFace}
                        />
                        <label htmlFor="image-face" className={classes.cmnd_front_upload}>
                            <IconButton variant="raised" component="span">
                                <PhotoCamera titleAccess="Thêm ảnh" />
                            </IconButton>
                        </label>
                        {
                            imageFace && <img 
                            className={classes.cmnd_front_image}
                            src={URL.createObjectURL(imageFace)}
                            title="Xóa"
                            onClick={() => removeImageFace()}
                            />
                        }
                    </div>
                    <div className="login-group">
                            <Button
                                variant="contained"
                                // color="primary"
                                type="submit"
                                className="login-button"
                                onClick={handleSubmit}
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

import React, { useState } from "react";
import { TextField, Button, CircularProgress, IconButton, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { profileStyles } from "../../style";
import { confirmAccount } from "../../redux/callApi/authCall";
import { checkImage, uploadImages } from "../../utils/uploadImage";

export default function ConfirmAccount(props) {


    const classes = profileStyles();

    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);
    const [text, setText] = useState(user.confirmAccount.confirmId ? user.confirmAccount.confirmId.cmnd : "");
    const [imageFront, setImageFront] = useState(user.confirmAccount.confirmId ? user.confirmAccount.confirmId.cmndFront : null);
    const [imageBack, setImageBack] = useState(user.confirmAccount.confirmId ? user.confirmAccount.confirmId.cmndBack : null);
    const [imageFace, setImageFace] = useState(user.confirmAccount.confirmId ? user.confirmAccount.confirmId.cmndFace : null);
    const [state, setState] = useState({
        loading: false,
        error: null
    })


    const handleChange = e => {
        if (!user.confirmAccount.confirmId) {
            setText(e.target.value);
        }
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
        if (!user.confirmAccount.confirmId) {
            setImageFront()
        }
    }
    const removeImageBack = () => {
        if (!user.confirmAccount.confirmId) {
            setImageBack()
        }
    }
    const removeImageFace = () => {
        if (!user.confirmAccount.confirmId) {
            setImageFace()
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cmndFront = await uploadImages([imageFront])
        const cmndBack = await uploadImages([imageBack])
        const cmndFace = await uploadImages([imageFace])
        if (text !== '' && imageFront != null && imageBack != null && imageFace != null) {
            setState({
                loading: true,
                error: null
            })
            dispatch(confirmAccount(token, { cmnd: text, cmndFront: cmndFront[0], cmndBack: cmndBack[0], cmndFace: cmndFace[0] }, () => {
                setState({
                    loading: false,
                    error: null,
                })
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
            {
                user.confirmAccount.confirmId && user.confirmAccount.confirmId.state === 0 ?
                    <Typography className={classes.state0}>Bạn đã gửi thông tin xác nhận, cần chờ admin xác nhận</Typography>
                    :
                    <></>
            }
            {
                user.confirmAccount.confirmId && user.confirmAccount.confirmId.state === 1 ?
                    <Typography className={classes.state1}>Tài khoản đã được xác minh</Typography>
                    :
                    <></>
            }
            {
                user.confirmAccount.confirmId && user.confirmAccount.confirmId.state === 2 ?
                    <Typography className={classes.state2}>Thông tin chưa được xác minh, bạn cần gửi lại thông tin</Typography>
                    :
                    <></>
            }
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
                        {
                            !user.confirmAccount.confirmId &&
                            <label htmlFor="image-front" className={classes.cmnd_front_upload}>
                                <IconButton variant="raised" component="span">
                                    <PhotoCamera titleAccess="Thêm ảnh" />
                                </IconButton>
                            </label>
                        }
                        {
                            imageFront && <img
                                className={classes.cmnd_front_image}
                                src={typeof imageFront === 'string' ? imageFront : URL.createObjectURL(imageFront)}
                                title="Xóa"
                                onClick={() => removeImageFront()}
                                alt='imageFront'
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
                        {
                            !user.confirmAccount.confirmId &&
                            <label htmlFor="image-back" className={classes.cmnd_front_upload}>
                                <IconButton variant="raised" component="span">
                                    <PhotoCamera titleAccess="Thêm ảnh" />
                                </IconButton>
                            </label>
                        }
                        {
                            imageBack && <img
                                className={classes.cmnd_front_image}
                                src={typeof imageBack === 'string' ? imageBack : URL.createObjectURL(imageBack)}
                                title="Xóa"
                                onClick={() => removeImageBack()}
                                alt='imageBack'
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
                        {
                            !user.confirmAccount.confirmId &&
                            <label htmlFor="image-face" className={classes.cmnd_front_upload}>
                                <IconButton variant="raised" component="span">
                                    <PhotoCamera titleAccess="Thêm ảnh" />
                                </IconButton>
                            </label>
                        }
                        {
                            imageFace && <img
                                className={classes.cmnd_front_image}
                                src={typeof imageFace === 'string' ? imageFace : URL.createObjectURL(imageFace)}
                                title="Xóa"
                                onClick={() => removeImageFace()}
                                alt='imageFace'
                            />
                        }
                    </div>
                    <div>
                        {

                        }
                    </div>
                    <div className="login-group">
                        <Button
                            variant="contained"
                            // color="primary"
                            type="submit"
                            className="login-button"
                            onClick={handleSubmit}
                            disabled={user.confirmAccount.confirmId}
                        >
                            {
                                state.loading ?
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

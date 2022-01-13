import { Button, CircularProgress, IconButton, Paper, Typography } from '@material-ui/core'
import { Close, CloudUpload } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar, changeBackground } from '../../redux/callApi/authCall';
import { formStyles } from '../../style'
import { checkImage } from '../../utils/uploadImage';

export default function ChangeImage(props) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { title, img, handleClose, type } = props;
    const [src, setSrc] = useState(img);

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth)

    const classes = formStyles();


    useEffect(() => {
        const holder = document.getElementById('upload-holder')
        if (holder) {
            holder.ondragover = function () {
                this.className = classes.borderDashHover;
                // console.log("on drag")
                return false;
            }
            holder.ondragend = function (e) {
                this.className = classes.borderDash;
            }
            holder.ondrop = function (e) {
                // console.log("on drop")
                this.className = classes.borderDash;
                e.preventDefault();
                setError(null);
                const image = e.dataTransfer.files[0];
                const check = checkImage(image);
                if (check === "")
                    setSrc(image)
                else setError(check);
            }
        }
    }, [classes, src])

    const changeImage = (e) => {
        if (e.target.files) {
            setError(null);
            const image = e.target.files[0];
            const check = checkImage(image);
            if (check === "")
                setSrc(image)
            else {
                setError(check);
            }
        }
    }


    const handleSubmit = () => {
        if (src === img) {
            handleClose();
            return;
        }
        setLoading(true);
        if (type === 'background') {
            dispatch(changeBackground(token, src, () => {
                setLoading(false);
                handleClose();
            }, (err) => {
                setError(err);
            }))
        }
        else if (type === 'avatar') {
            dispatch(changeAvatar(token, src, () => {
                setLoading(false);
                handleClose();
            }, (err) => {
                setError(err);
            }))
        }
    }

    const removeImage = () => {
        setSrc(null);
    }

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.title}>
                <div></div>
                <Typography variant='h5'>{title}</Typography>
                <IconButton onClick={handleClose} size='small'>
                    <Close />
                </IconButton>
            </div>
            <div className={classes.bodyChangeImage}>
                <div className={classes.center}>
                    {src ?
                        <img src={typeof src === 'string' ? src : URL.createObjectURL(src)} alt="Avatar" title={title} className={classes.imageChange} />
                        :
                        <div className={classes.borderDash} id="upload-holder">
                            <div className={classes.uploadWrap}>
                                <Typography variant='h6'>
                                    Kéo hình vào đây hoặc
                                </Typography>
                                <input name="images" style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" onChange={changeImage} className={classes.imageChageInput} />
                                <div className={classes.center}>
                                    <label htmlFor='icon-button-file'>
                                        <Button variant="contained" component="span" color="primary">
                                            Chọn tệp ...
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{error}</span>
                <div className={classes.buttonWrap}>
                    <Button onClick={removeImage} className={classes.removeImageChange} disabled={loading || !src}>
                        Xóa
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        startIcon={<CloudUpload />}
                        variant='contained'
                        color="primary"
                        disabled={!src}
                    >
                        {
                            loading ?
                                <CircularProgress size="25px" style={{ color: "white" }} />
                                : "Tải lên"
                        }
                    </Button>
                </div>

            </div>
        </Paper>
    )
}

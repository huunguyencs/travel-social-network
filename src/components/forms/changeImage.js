import { Button, CircularProgress, IconButton, Paper, Typography } from '@material-ui/core'
import { Close, CloudUpload } from '@material-ui/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar, changeBackground } from '../../redux/callApi/authCall';
import { formStyles } from '../../style'

export default function ChangeImage(props) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { title, img, handleClose, type } = props;
    const [src, setSrc] = useState(img);

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth)

    const classes = formStyles();

    const holder = document.getElementById('upload-holder')
    if (holder) {
        holder.ondragover = function () {
            this.className = classes.borderDashHover;
            return false;
        }
        holder.ondragend = function () {
            this.className = classes.borderDash;
            return false;
        }

        holder.ondrop = function (e) {
            this.className = classes.borderDash;
            e.preventDefault();
            setError(null);
            setSrc(e.dataTransfer.files[0])
        }
    }

    const changeImage = (e) => {
        console.log(e);
        if (e.target.files) {
            setError(null);
            setSrc(e.target.files[0])
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
                {src ?

                    <img src={typeof src === 'string' ? src : URL.createObjectURL(src)} alt="Avatar" title={title} className={classes.imageChange} />
                    :
                    <div className={classes.borderDash} id="upload-holder">
                        <div className={classes.uploadWrap}>
                            <Typography variant='h6'>
                                Kéo hình vào đây hoặc
                            </Typography>
                            <input accept="image/*" id="icon-button-file" type="file" onChange={changeImage} className={classes.imageChageInput} />
                        </div>
                    </div>
                }
                <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{error}</span>
                <div className={classes.buttonWrap}>
                    <Button onClick={removeImage} className={classes.removeImageChange} disabled={loading}>
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

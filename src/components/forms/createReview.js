import { InputBase, Typography, Button, Paper, IconButton, CircularProgress } from "@material-ui/core";
import { Create, Image } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { formStyles } from '../../style';
import LoginModal from "../modal/login";
import EmojiPicker from "../input/emojiPicker";
import { createPost } from "../../redux/callApi/postCall";


export default function CreateReviewForm(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { auth } = useSelector(state => state);
    const { location, handleClose, tourDateId, indexLocation } = props;
    const [state, setState] = useState({
        loading: false,
        error: false,
    })


    const [imageUpload, setImageUpload] = useState([]);
    const [context, setContext] = useState({
        hashtags: "",
        rate: 0,
    })
    const [text, setText] = useState("");

    const handleInput = (e) => {
        setContext({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleChange = e => {
        setText(e.target.value);
    }

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleChangeImageUpload = (e) => {
        setImageUpload(oldImage => [...oldImage, ...e.target.files])
    }

    const removeImage = (index) => {
        setImageUpload(oldImage => [
            ...oldImage.slice(0, index),
            ...oldImage.slice(index + 1)
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!context.rate) {
            return;
        }
        setState({
            loading: true,
            error: false
        })
        var ht = hashtagSplit(context.hashtags);
        dispatch(createPost({
            content: text,
            image: imageUpload,
            hashtags: ht,
            rate: context.rate,
            locationId: location,
            tourDateId: tourDateId,
            indexLocation: indexLocation
        },
            auth.token,
            "review",
            () => {
                setState({
                    loading: false,
                    error: false
                })
                handleClose();
                history.push(`/location/${location}`);
            },
            () => {
                setState({
                    loading: false,
                    error: true,
                })
            }
        ))

    }


    const classes = formStyles();


    return (
        <>
            {auth.token ?

                <Paper className={classes.paperContainer}>
                    <div className={classes.textTitle}>
                        <Typography variant="h5">
                            Tạo review {location.fullname}
                        </Typography>
                    </div>
                    <form>
                        <div className={classes.formContainer}>
                            <div className={classes.formCreateReview}>
                                <Rating
                                    name="rate"
                                    value={context.rate}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className={classes.postContentInput}>
                                <InputBase
                                    placeholder="Bạn cảm thấy địa điểm này như thế nào?..."
                                    rows={10}
                                    multiline
                                    name="content"
                                    className={classes.input}
                                    value={text}
                                    onChange={handleChange}
                                />
                            </div>
                            <div >
                                <InputBase
                                    placeholder="Hashtag (cách nhau bằng dấu cách). Vd: #bien #lehoi ..."
                                    variant="outlined"
                                    name="hashtags"
                                    id="hashtag"
                                    className={classes.hashtag}
                                    value={context.hashtags}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className={classes.formAction}>
                                <div >
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        style={{ display: 'none' }}
                                        id="input-image"
                                        name="images"
                                        multiple
                                        type="file"
                                        onChange={handleChangeImageUpload}
                                    />
                                    <label htmlFor="input-image">
                                        <IconButton variant="raised" component="span">
                                            <Image titleAccess="Thêm ảnh" />
                                        </IconButton>
                                    </label>
                                    <EmojiPicker content={text} setContent={setText} />
                                </div>
                                <div>
                                    <Button className={classes.button} onClick={handleSubmit}>
                                        {
                                            state.loading ?
                                                <CircularProgress size="25px" color="inherit" /> :
                                                <>
                                                    <Create style={{ marginRight: 10 }} />
                                                    Đăng
                                                </>
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div
                        style={{
                            marginInline: "20px",
                            maxWidth: "600px"
                        }}
                    >
                        {imageUpload.length > 0 &&
                            <ScrollMenu
                                height="300px"
                            >
                                {imageUpload.map((item, index) =>
                                    <img
                                        key={index}
                                        alt="not found"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            margin: "5px",
                                            position: "relative",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => removeImage(index)}
                                        src={URL.createObjectURL(item)}
                                    />
                                )}
                            </ScrollMenu>

                        }
                    </div>
                </Paper >
                : <LoginModal />
            }
        </>
    )
}
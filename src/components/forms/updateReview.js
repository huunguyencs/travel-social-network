import { InputBase, Typography, Button, Paper, IconButton, CircularProgress } from "@material-ui/core";
import { Image, Update } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import LoginModal from "../modal/login";
import EmojiPicker from "../input/emojiPicker";
import { updatePost } from "../../redux/callApi/postCall";



export default function UpdateReviewForm(props) {

    const [change, setChange] = useState(false);
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const { review, handleClose } = props;
    const [state, setState] = useState({
        loading: false,
        error: false,
    })


    const [imageUpload, setImageUpload] = useState(review.images);
    const [context, setContext] = useState({
        hashtags: "",
        rate: 0,
    })

    useEffect(() => {
        if (review) {
            setContext({
                hashtags: review.hashtags.join(" "),
                rate: review.rate
            })
        }
    }, [setContext, review])

    const [text, setText] = useState(review.content);

    const handleInput = (e) => {
        if (!change) setChange(true);
        setContext({
            ...context,
            [e.target.name]: e.target.value,
        })
    }

    const handleChange = e => {
        if (!change) setChange(true);
        setText(e.target.value);
    }

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleChangeImageUpload = (e) => {
        if (!change) setChange(true);
        setImageUpload(oldImage => [...oldImage, ...e.target.files])
    }

    const removeImage = (index) => {
        if (!change) setChange(true);
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
        if (!change) {
            handleClose();
            return;
        }
        setState({
            loading: true,
            error: false
        })
        var ht = hashtagSplit(context.hashtags);
        dispatch(updatePost({
            id: review._id,
            content: text,
            images: imageUpload,
            hashtags: ht,
            rate: context.rate,
            oldRate: review.rate,
            locationId: review.locationId._id
        },
            auth.token,
            () => {
                setState({
                    loading: false,
                    error: false
                })
                handleClose();
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
                            Chỉnh sửa review {review.locationId.fullname}
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
                                    id="hashtags"
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
                                                    <Update style={{ marginRight: 10 }} />
                                                    Xong
                                                </>
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div
                        className={classes.imageInputContainer}
                    >
                        {imageUpload.length > 0 &&
                            <ScrollMenu
                                height="300px"
                            >
                                {imageUpload.map((item, index) =>
                                    <img
                                        key={index}
                                        alt="not found"
                                        className={classes.imageInput}
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
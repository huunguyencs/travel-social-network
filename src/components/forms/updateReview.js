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
import { checkImage } from "../../utils/uploadImage";



export default function UpdateReviewForm(props) {

    const [change, setChange] = useState(false);
    const dispatch = useDispatch();
    const { auth, socket } = useSelector(state => state);
    const { review, handleClose } = props;
    const [state, setState] = useState({
        loading: false,
        error: '',
    })


    const [imageUpload, setImageUpload] = useState(review.images);

    const [hashtags, setHashtags] = useState("");
    const [rate, setRate] = useState(0);
    const [text, setText] = useState(review.content)

    useEffect(() => {
        if (review) {
            setHashtags(review.hashtags.join(" "))
            setRate(review.rate);
            setText(review.content);
        }
    }, [setHashtags, setRate, setText, review])

    const handleChangeHashtags = e => {
        if (!change) setChange(true);
        setHashtags(e.target.value)
    }

    const handleChangeRate = e => {
        if (!change) setChange(true);
        setRate(e.target.value)
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
        let error = "";
        for (const file of e.target.files) {
            const check = checkImage(file);
            if (check !== "") {
                error = check;
                break;
            }
        }
        if (error === "")
            setImageUpload(oldImage => [...oldImage, ...e.target.files])
        else
            setState({
                ...state,
                error: error
            })
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

        if (!change) {
            handleClose();
            return;
        }
        if (!rate || rate === 0) {
            return;
        }
        setState({
            loading: true,
            error: ''
        })
        var ht = hashtagSplit(hashtags);
        dispatch(updatePost({
            id: review._id,
            content: text,
            images: imageUpload,
            hashtags: ht,
            rate: rate,
            oldRate: review.rate,
            locationId: review.locationId._id
        },
            auth.token,
            socket,
            () => {
                setState({
                    loading: false,
                    error: ''
                })
                handleClose();
            },
            () => {
                setState({
                    loading: false,
                    error: 'Có lỗi xảy ra',
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
                                    value={rate}
                                    onChange={handleChangeRate}
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
                                    value={hashtags}
                                    onChange={handleChangeHashtags}
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

                    <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{state.error}</span>

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
                                        alt="Error"
                                        className={classes.imageInput}
                                        onClick={() => removeImage(index)}
                                        src={typeof item === "string" ? item : URL.createObjectURL(item)}
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
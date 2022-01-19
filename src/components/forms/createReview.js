import { InputBase, Typography, Button, Paper, IconButton, CircularProgress } from "@material-ui/core";
import { Create, Image } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import { formStyles } from '../../style';
import LoginModal from "../modal/login";
import EmojiPicker from "../input/emojiPicker";
import { createPost } from "../../redux/callApi/postCall";
import { checkImage } from "../../utils/uploadImage";


export default function CreateReviewForm(props) {

    const dispatch = useDispatch();
    // const history = useHistory();
    const { auth, socket } = useSelector(state => state);
    const { location, handleClose, tourDateId, indexLocation } = props;
    const [state, setState] = useState({
        loading: false,
        error: '',
    })


    const [imageUpload, setImageUpload] = useState([]);
    const [hashtags, setHashtags] = useState("")
    const [rate, setRate] = useState(0);
    const [text, setText] = useState("");


    const handleChange = e => {
        setText(e.target.value);
    }

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleChangeImageUpload = (e) => {
        let error = "";
        for (const file of e.target.files) {
            const check = checkImage(file);
            if (check !== "") {
                error = check;
                break;
            }
        }
        if (error === "") {
            setState({
                ...state,
                error: null
            })
            setImageUpload(oldImage => [...oldImage, ...e.target.files])
        }

        else
            setState({
                ...state,
                error: error
            })
    }

    const removeImage = (index) => {
        setImageUpload(oldImage => [
            ...oldImage.slice(0, index),
            ...oldImage.slice(index + 1)
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rate || rate === 0) {
            setState({
                ...state,
                error: "Hãy thêm đánh giá sao!"
            })
            return;
        }
        setState({
            loading: true,
            error: false
        })
        var ht = hashtagSplit(hashtags);
        dispatch(createPost({
            content: text,
            image: imageUpload,
            hashtags: ht,
            rate: rate,
            locationId: location._id,
            tourDateId: tourDateId,
            indexLocation: indexLocation
        },
            auth.token,
            "review",
            socket,
            () => {
                setState({
                    loading: false,
                    error: false
                })
                handleClose();
                // history.push(`/location/${location.name}`);
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
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
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
                                    onChange={(e) => setHashtags(e.target.value)}
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
                    <div className={classes.center}>
                        <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{state.error}</span>
                    </div>


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
                                        src={URL.createObjectURL(item)}
                                        title="Xóa"
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
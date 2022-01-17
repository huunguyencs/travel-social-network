import { InputBase, Typography, Button, Paper, IconButton, CircularProgress } from "@material-ui/core";
import { Image, Update } from "@material-ui/icons";
import React, { useState } from "react";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/callApi/postCall";

import { formStyles } from '../../style';
import { checkImage } from "../../utils/uploadImage";
import EmojiPicker from "../input/emojiPicker";
import LoginModal from "../modal/login";

export default function UpdatePostForm(props) {

    const [change, setChange] = useState(false);
    const { post, handleClose } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const { auth, socket } = useSelector(state => state);

    const [imageUpload, setImageUpload] = useState(post.images);

    const [text, setText] = useState(post.content);
    const [hashtag, setHashtag] = useState(post.hashtags.join(" "));

    const handleChange = e => {
        if (!change) setChange(true);
        setText(e.target.value);
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
        if (!change) setChange(true);
        setImageUpload(oldImage => [
            ...oldImage.slice(0, index),
            ...oldImage.slice(index + 1)
        ])
    }

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!change) {
            handleClose();
            return;
        }
        var ht = hashtagSplit(hashtag);
        if (text !== '' || imageUpload.length > 0 || ht.length > 0) {
            setState({
                loading: true,
                error: false
            })
            dispatch(updatePost({ id: post._id, content: text, images: imageUpload, hashtags: ht }, auth.token, socket, () => {
                setState({
                    loading: false,
                    error: false,
                })
                handleClose();
            }, () => {
                setState({
                    loading: false,
                    error: true
                })
            }));

        }
    }

    const classes = formStyles();

    return (
        <>
            {auth.token ?
                <Paper className={classes.paperContainer}>
                    <div className={classes.textTitle}>
                        <Typography variant="h5">
                            Chỉnh sửa bài viết
                        </Typography>
                    </div>
                    <form>
                        <div className={classes.formContainer}>
                            <div className={classes.postContentInput}>
                                <InputBase
                                    placeholder="Bạn đang nghĩ gì?..."
                                    rows={10}
                                    name="content"
                                    id="content"
                                    multiline
                                    className={classes.input}
                                    value={text}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div >
                                <InputBase
                                    placeholder="Hashtag (cách nhau bằng dấu cách). Vd: #bien #lehoi ..."
                                    variant="outlined"
                                    name="hashtag"
                                    id="hashtag"
                                    className={classes.hashtag}
                                    value={hashtag}
                                    onChange={e => setHashtag(e.target.value)}
                                />
                            </div>
                            <div className={classes.formAction}>
                                <div>
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
                                                <CircularProgress size="25px" color="white" /> :
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

                    <div className={classes.error}>
                        <Typography variant="caption" color="inherit">{state.error}</Typography>
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
                                        src={typeof item === "string" ? item : URL.createObjectURL(item)}
                                        title="Xóa"
                                    />
                                )}
                            </ScrollMenu>

                        }
                    </div>
                </Paper>
                : <LoginModal />
            }
        </>
    )
}
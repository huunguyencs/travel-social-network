import { InputBase, Typography, Button, Paper, IconButton, CircularProgress } from "@material-ui/core";
import { Create, Image } from "@material-ui/icons";
import React, { useState } from "react";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { formStyles } from '../../style';
import EmojiPicker from "../input/emojiPicker";
import LoginModal from "../modal/login";
import * as imageUtils from '../../utils/uploadImage';
import customAxios from "../../utils/fetchData";

export default function CreatePostForm(props) {

    const history = useHistory();

    const { auth } = useSelector(state => state);

    const [imageUpload, setImageUpload] = useState([]);
    const [showWarning, setShowWarning] = useState("");

    const [text, setText] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const handleChange = e => {
        setText(e.target.value);
    }

    const handleChangeImageUpload = (e) => {
        setShowWarning("");
        let valid = true;
        for (const file of e.target.files) {
            const check = imageUtils.checkImage(file);
            if (check !== "") {
                setShowWarning(check);
                valid = false;
                break;
            }
        }
        if (valid)
            setImageUpload(oldImage => [...oldImage, ...e.target.files])
    }

    const removeImage = (index) => {
        setImageUpload(oldImage => [
            ...oldImage.slice(0, index),
            ...oldImage.slice(index + 1)
        ])
    }

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var ht = hashtagSplit(hashtag);
        if (text !== '' || imageUpload.length > 0 || ht.length > 0) {
            setState({
                loading: true,
                error: false
            })
            var data = { content: text, image: imageUpload, hashtags: ht };
            let image = [];
            if (imageUpload.length > 0) image = await imageUtils.uploadImages(imageUpload);
            const post = {
                ...data,
                images: image
            }
            try {
                await customAxios(auth.token).post("/post/create_post", post).then(res => {
                    if (props.addPost !== undefined) props.addPost(res.data.newPost);
                    props.handleClose();
                    history.push("/");
                    setState({
                        loading: false,
                        error: false
                    })
                }).catch(err => {
                    setState({
                        loading: false,
                        error: true
                    })
                })
            }
            catch (err) {
                setState({
                    loading: false,
                    error: true
                })
            }

        }
    }

    const classes = formStyles();

    return (
        <>
            {auth.token ?
                <Paper className={classes.paperContainer}>
                    <div className={classes.textTitle}>
                        <Typography variant="h5">
                            Tạo bài viết
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
                                                    <Create style={{ marginRight: 10 }} />
                                                    Đăng
                                                </>
                                        }
                                    </Button>
                                </div>
                            </div>


                        </div>
                    </form>
                    <div style={{ fontSize: "20px", color: "red", marginInline: "25px" }}>{showWarning}</div>
                    <div
                        style={{
                            marginInline: "20px",
                            maxWidth: "500px"
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
                </Paper>
                : <LoginModal />
            }
        </>
    )
}
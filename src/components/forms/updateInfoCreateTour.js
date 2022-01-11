import { InputBase, Typography, Button, Paper, IconButton, TextField } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { formStyles } from '../../style';
import { updateInfo } from '../../redux/actions/createTourAction';
import EmojiPicker from "../input/emojiPicker";


export default function UpdateTourInfo({ name, content, hashtags, image, handleClose, cost }) {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: name,
        hashtags: hashtags.join(" "),
        image: image,
        cost: cost
    })

    const [text, setText] = useState(content);


    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleChangeImageUpload = (e) => {
        // setImageUpload(e.target.files)
        setState({
            ...state,
            image: e.target.files[0],
        })
    }

    const removeImage = () => {
        // setImageUpload(null)
        setState({
            ...state,
            image: null,
        })
    }

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleSubmit = () => {
        // console.log(state);
        let ht = hashtagSplit(state.hashtags)
        dispatch(updateInfo({ name: state.name, content: text, hashtags: ht, image: state.image, cost: state.cost }));
        handleClose();
    }


    const classes = formStyles();

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Thay đổi thông tin
                </Typography>
            </div>
            <form>
                <div className={classes.formContainer}>
                    <TextField
                        name="name"
                        id="name"
                        label="Tên tour"
                        variant="outlined"
                        value={state.name}
                        className={classes.tourNameInput}
                        onChange={handleInput}
                    />
                    <TextField
                        type={"number"}
                        name="cost"
                        id="cost"
                        label="Chi phí (nghìn VND)"
                        variant="outlined"
                        value={state.cost}
                        className={classes.tourNameInput}
                        onChange={handleInput}
                    />
                    <div className={classes.postContentInput}>
                        <InputBase
                            placeholder="Nội dung tour ..."
                            rows={7}
                            name="content"
                            id="content"
                            multiline
                            className={classes.input}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                    <div >
                        <InputBase
                            placeholder="Hashtag. Ex: #bien #lehoi ..."
                            variant="outlined"
                            name="hashtags"
                            id="hashtags"
                            value={state.hashtags}
                            className={classes.hashtag}
                            onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formAction}>
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{ display: 'none' }}
                                id="input-image"
                                name="input-image"
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
                                Xong
                            </Button>
                        </div>
                    </div>


                </div>
            </form>
            <div
                className={classes.imageInputContainer}
            >
                {state.image &&
                    <img
                        alt="Error"
                        className={classes.imageInput}
                        onClick={removeImage}
                        src={URL.createObjectURL(state.image)}
                    />
                }
            </div>
        </Paper>
    )
}
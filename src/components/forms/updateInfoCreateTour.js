import { InputBase, Typography, Grid, Button, Paper, IconButton, TextField } from "@material-ui/core";
import { AddCircleOutline, Create, Image, InsertEmoticon } from "@material-ui/icons";
import React, { useState } from "react";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { formStyles } from '../../style';
import EmojiPicker from "../input/emojiPicker";


export default function UpdateTourInfo(props) {

    const [imageUpload, setImageUpload] = useState([]);

    const [text, setText] = useState("");

    const handleChange = e => {
        setText(e.target.value);
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
                        className={classes.tourNameInput}
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
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div >
                        <InputBase
                            placeholder="Hashtag. Ex: #bien #lehoi ..."
                            variant="outlined"
                            name="hashtag"
                            id="hashtag"
                            className={classes.hashtag}
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
                                <IconButton className={classes.button} variant="raised" component="span">
                                    <Image titleAccess="Thêm ảnh" />
                                </IconButton>
                            </label>
                            <EmojiPicker content={text} setContent={setText} />
                        </div>
                        <div>
                            <Button className={classes.button}>
                                <Create style={{ marginRight: 10 }} />
                                Xong
                            </Button>
                        </div>
                    </div>


                </div>
            </form>
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
    )
}
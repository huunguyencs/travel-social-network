import { InputBase, Typography, Grid, Button, Paper } from "@material-ui/core";
import { AddCircleOutline, Create } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useSelector } from "react-redux";

import { formStyles } from '../../style';
import LoginModal from "../modal/login";


export default function CreateReviewForm(props) {

    const { auth } = useSelector(state => state);


    const [imageUpload, setImageUpload] = useState([]);

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

    const [rate, setRate] = useState();

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
                        <Grid container className={classes.formContainer}>
                            <Grid item md={12}>
                                <div className={classes.formCreateReview}>
                                    <Rating
                                        name={"rating"}
                                        value={rate}
                                        onChange={(e, newValue) => {
                                            setRate(newValue);
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={12}>
                                <InputBase
                                    placeholder="Bạn cảm thấy địa điểm này như thế nào?..."
                                    rows={10}
                                    multiline
                                    className={classes.input}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    style={{ display: 'none' }}
                                    id="input-image"
                                    name="input-image"
                                    multiple
                                    type="file"
                                    onChange={handleChangeImageUpload}
                                />
                                <label htmlFor="input-image">
                                    <Button className={classes.button} variant="raised" component="span">
                                        <AddCircleOutline style={{ marginRight: 10 }} />
                                        Thêm ảnh
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item md={6}>
                                <Button className={classes.button}>
                                    <Create style={{ marginRight: 10 }} />
                                    Đăng
                                </Button>
                            </Grid>
                        </Grid>
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
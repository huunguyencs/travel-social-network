import { InputBase, Typography, Grid, Button, Paper } from "@material-ui/core";
import { AddCircleOutline, Create } from "@material-ui/icons";
import React from "react";

import { formStyles } from '../../style';


export default function CreatePostForm(props) {

    const classes = formStyles();

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Tạo bài viết
                </Typography>
            </div>
            <form>
                <Grid container className={classes.formContainer}>
                    <Grid item md={12}>
                        <InputBase
                            placeholder="Bạn đang nghĩ gì?..."
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
                            id="raised-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
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
        </Paper>
    )
}
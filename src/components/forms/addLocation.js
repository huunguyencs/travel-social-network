import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";

import { formStyles } from '../../style';


export default function AddLocationForm(props) {

    const classes = formStyles();

    return (
        <Paper className={[classes.paperContainer, classes.addFormContainer]}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Thêm địa điểm
                </Typography>
            </div>
            <form
                className={classes.addLocationForm}
            >
                <TextField
                    label="Địa điểm"
                    variant="outlined"
                    name="name"
                    className="form-input"
                    required
                />
                <TextField
                    label="Chi phí dự kiến (nghìn VND)"
                    variant="outlined"
                    name="name"
                    className="form-input"
                />
                <div>
                    <Button
                        className={classes.addLocationSubmit}
                        type="submit"
                    >
                        Xong
                    </Button>
                </div>
            </form>
        </Paper >
    )
}
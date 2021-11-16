import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    moreButton: {
        marginInline: 10,
        fontWeight: 500,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    }
}))

export function SeeMoreText({ variant, maxText, text }) {
    const [more, setMore] = useState(false);

    const classes = useStyles();

    return (
        <Typography variant={variant}>
            {text.length < maxText ? text :
                (
                    <>
                        <span>{text.slice(0, maxText)}</span>
                        {more ? <span>{text.slice(maxText)}</span> : <span>...</span>}
                        {!more && <span onClick={() => setMore(true)} className={classes.moreButton}>Xem thêm</span>}
                    </>
                )
            }
        </Typography>
    )
}
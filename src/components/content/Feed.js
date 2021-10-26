import { Container, InputBase, makeStyles, alpha } from "@material-ui/core";
import Post from "./Post";

import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
        alignContent: "center",
    },
    content: {
        // marginLeft: theme.spacing(10),
        // marginRight: theme.spacing(10),
    },
    create: {
        margin: 30,
        backgroundColor: "#EEF6F3",
        paddingInline: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: 20,
        border: "1px solid rgba(47, 53, 66, 0.5)",
        "&:hover": {
            backgroundColor: alpha("#aaa", 0.15),
        }


    },
    createText: {
        width: "100%",
    }
}));

export default function Feed(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <InputBase
                        placeholder="Bạn đang nghĩ gì?..."
                        className={classes.createText}
                    />
                </div>
            </div>
            <div>
                <Post />
                <Post />
            </div>
        </Container>
    )
}
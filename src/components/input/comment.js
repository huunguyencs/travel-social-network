import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import EmojiPicker from "./emojiPicker";
import { inputStyles } from "../../style";
import { createComment } from "../../redux/callApi/commentCall";


export default function InputComment(props) {

    const { type, id, addComment } = props;

    const classes = inputStyles();
    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const { auth, socket } = useSelector(state => state);

    const handleComment = (e) => {
        e.preventDefault();
        if (text.trim() !== "") {
            setText("");
            dispatch(createComment(id, text, auth, type, socket, (newComment) => addComment(newComment)));

        }
    }

    return (
        <form
            onSubmit={handleComment}
            className={classes.writeCmt}
        >
            <EmojiPicker content={text} setContent={setText} />

            <InputBase
                placeholder="Viết bình luận ..."
                className={classes.writeCmtText}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <IconButton disabled={text.trim() === ""} type="submit">
                <Send />
            </IconButton>
        </form>
    )
}
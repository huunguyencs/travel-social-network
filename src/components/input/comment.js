import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Send } from "@material-ui/icons";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "./emojiPicker";

import { inputStyles } from "../../style";
import { createCommentPost } from "../../redux/callApi/commentCall";
import { createCommentTour } from "../../redux/callApi/commentCall";
import { useDispatch, useSelector } from "react-redux";

export default function InputComment(props) {

    const { type, id, addComment } = props;

    const classes = inputStyles();
    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const handleComment = (e) => {
        e.preventDefault();
        if (text.trim() !== "") {
            setText("");
            if (type === "post") {
                dispatch(createCommentPost(id, text, auth, (newComment) => addComment(newComment)));
            }
            else if (type === "tour") {
                dispatch(createCommentTour(id, text, auth, (newComment) => addComment(newComment)));
            }

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
import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import EmojiPicker from "./emojiPicker";
import { inputStyles } from "../../style";
import { createComment, updateComment } from "../../redux/callApi/commentCall";


export default function InputComment(props) {

    const { type, id, isUpdate, comment, handleClose, commentId } = props;

    const classes = inputStyles();
    const [text, setText] = useState(comment ? comment : "");

    const dispatch = useDispatch();
    const { auth, socket } = useSelector(state => state);

    const handleComment = (e) => {
        e.preventDefault();
        setText("");
        if (text.trim() !== "") {
            if (isUpdate) {
                if (text === comment) {
                    handleClose();
                    return;
                }
                dispatch(updateComment(commentId, id, text, auth, type))
                handleClose();
            }
            else {
                dispatch(createComment(id, text, auth, type, socket));
            }

        }
    }

    return (
        <form
            onSubmit={handleComment}
            className={classes.writeCmt}
            style={{ margin: isUpdate ? 0 : 20 }}
        >
            <EmojiPicker content={text} setContent={setText} />

            <InputBase
                placeholder="Viết bình luận ..."
                className={classes.writeCmtText}
                value={text}
                onChange={e => setText(e.target.value)}
                disabled={!auth.user}
            />
            <IconButton disabled={!text || text.trim() === ""} type="submit">
                <Send />
            </IconButton>
        </form>
    )
}
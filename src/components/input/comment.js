import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useSelector } from "react-redux";

import EmojiPicker from "./emojiPicker";
import { inputStyles } from "../../style";
import customAxios from "../../utils/fetchData";

export default function InputComment(props) {

    const { type, id, addComment } = props;

    const classes = inputStyles();
    const [text, setText] = useState("");

    const { auth } = useSelector(state => state);

    const createComment = async (type) => {
        try {
            var body = {
                commentType: type,
                content: text
            }
            body = type === "post" ? { ...body, postId: id } : { ...body, tourId: id }
            await customAxios(auth.token).post(`comment/create_comment`, body).then(res => {
                addComment({
                    ...res.data.newComment,
                    userId: auth.user,
                })
            }).catch(err => {

            })
        }
        catch (err) {

        }
    }

    const handleComment = (e) => {
        e.preventDefault();
        setText(text.trim());
        if (text !== "") {
            setText("");
            createComment(type);
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
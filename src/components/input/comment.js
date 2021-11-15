import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Send } from "@material-ui/icons";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "./emojiPicker";

import { inputStyles } from "../../style";

export default function InputComment(props) {

    const classes = inputStyles();

    const [showPicker, setShowPicker] = useState(null);
    const [text, setText] = useState("");

    const handleShowPicker = (e) => {
        setShowPicker(e.currentTarget)
    }

    const handleClosePicker = (e) => {
        setShowPicker(null);
    }

    const onEmojiClick = (e, emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji);
    }

    return (
        <div className={classes.writeCmt}>
            <EmojiPicker content={text} setContent={setText} />
            <InputBase
                placeholder="Viết bình luận ..."
                className={classes.writeCmtText}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <IconButton disabled={text === ""}>
                <Send />
            </IconButton>
        </div>
    )
}
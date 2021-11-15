import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Send } from "@material-ui/icons";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "./emojiPicker";

import { inputStyles } from "../../style";

export default function InputComment(props) {

    const classes = inputStyles();
    const [text, setText] = useState("");

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
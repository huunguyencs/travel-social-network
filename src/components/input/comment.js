import React, { useState } from "react";
import { IconButton, InputBase, Popover } from "@material-ui/core";
import { InsertEmoticon } from "@material-ui/icons";
import EmojiPicker from "emoji-picker-react";
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
            <InputBase
                placeholder="Viết bình luận ..."
                className={classes.writeCmtText}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
            >
                <InsertEmoticon onClick={handleShowPicker} />
            </IconButton>



            <Popover
                open={Boolean(showPicker)}
                anchorEl={showPicker}
                onClose={handleClosePicker}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <EmojiPicker
                    onEmojiClick={onEmojiClick}
                />
            </Popover>
        </div>
    )
}
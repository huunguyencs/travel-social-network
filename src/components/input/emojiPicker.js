import { IconButton, Paper, Popover } from "@material-ui/core";
import { InsertEmoticon } from "@material-ui/icons";
import React, { useState } from "react";
import { emojiPickerStyles } from "../../style";


export default function EmojiPicker(props) {

    const classes = emojiPickerStyles();

    const { content, setContent } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const emojiList = [
        '👍', '👎', '✌️', '🤞', '👌', '🤙', '🤘', '🖕',
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵',
        '🤣', '🙂', '😅', '😋', '😝', '😰', '💩', '🤬',
        '😷', '😱'
    ];

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? "emoij-popover" : undefined;

    const addIcon = (icon) => {
        setContent(content + icon);
    }

    return (
        <>
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                <InsertEmoticon titleAccess="Chèn cảm xúc" />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Paper className={classes.iconWrap}>
                    {emojiList.map((item, index) => (
                        <div key={index} className={classes.iconItem} onClick={() => addIcon(item)}>
                            {item}
                        </div>
                    ))}
                </Paper>
            </Popover>
        </>
    )
}
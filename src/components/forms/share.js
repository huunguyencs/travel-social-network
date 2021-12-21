import { Button, CircularProgress, InputBase, Paper, Typography } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { formStyles } from "../../style";
import customAxios from '../../utils/fetchData';
import EmojiPicker from '../input/emojiPicker';
import LoginModal from "../modal/login";

export default function SharePost(props) {

    const { object, type, handleClose } = props;

    const { auth, notify } = useSelector(state => state);

    const [text, setText] = useState("");
    const [hashtag, setHashtag] = useState("");

    const classes = formStyles();

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const share = () => {
        var ht = hashtagSplit(hashtag);
        await customAxios(auth.token).post(`${type}/share`, {
            shareId: object._id,
            content: text,
            hashtags: ht
        }).then((res) => {
            if (res.status === 200) {
                handleClose();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleShare = (e) => {
        e.preventDefault();
        share();
    }

    return (
        <>
            {auth.token ?
                <Paper className={classes.paperContainer}>
                    <div className={classes.textTitle}>
                        <Typography variant="h5">
                            Chia sẻ {type === "post" ? "bài viết" : "lịch trình"} của {object.userId.fullname}
                        </Typography>
                    </div>
                    <form>
                        <div className={classes.formContainer}>
                            <div className={classes.postContentInput}>
                                <InputBase
                                    placeholder="Viết gì đó..."
                                    rows={10}
                                    name="content"
                                    id="content"
                                    multiline
                                    className={classes.input}
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </div>
                            <div >
                                <InputBase
                                    placeholder="Hashtag (cách nhau bằng dấu cách). Vd: #bien #lehoi ..."
                                    variant="outlined"
                                    name="hashtag"
                                    id="hashtag"
                                    className={classes.hashtag}
                                    value={hashtag}
                                    onChange={e => setHashtag(e.target.value)}
                                />
                            </div>
                            <div className={classes.formAction}>
                                <EmojiPicker content={text} setContent={setText} />
                                <div>
                                    <Button className={classes.button} onClick={handleShare}>
                                        {
                                            notify.loading ?
                                                <CircularProgress size="25px" color="white" /> :
                                                <>
                                                    <Share style={{ marginRight: 10 }} />
                                                    Chia sẻ
                                                </>
                                        }
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </Paper>
                : <LoginModal />
            }
        </>
    )
}

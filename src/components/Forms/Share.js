import { Button, CircularProgress, InputBase, Paper, Typography } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from "../../style";
import EmojiPicker from '../Input/EmojiPicker';
import LoginModal from "../Modal/Login";
import { share } from '../../redux/callApi/postCall'

export default function SharePost(props) {

    const { object, type, handleClose } = props;

    const dispatch = useDispatch();

    const { auth } = useSelector(state => state);
    const [state, setState] = useState({
        loading: false,
        error: false,
    })

    const [text, setText] = useState("");
    const [hashtag, setHashtag] = useState("");

    const classes = formStyles();

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
    }

    const handleShare = async (e) => {
        e.preventDefault();
        var ht = hashtagSplit(hashtag);
        setState({
            loading: true,
            error: false
        })
        dispatch(share(type, auth.token, object._id, text, ht, () => {
            setState({
                loading: false,
                error: false
            })
            handleClose();
        }, () => {
            setState({
                loading: false,
                error: true
            })
        }))
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
                                            state.loading ?
                                                <CircularProgress size="25px" color="inherit" /> :
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

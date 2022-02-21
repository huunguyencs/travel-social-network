import { Typography, Avatar, Grid } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { Call, Delete, Send } from "@material-ui/icons";
import { messageStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage, getMessages } from '../../redux/callApi/messageCall';
import { timeAgo } from "../../utils/date";

export default function Chat() {
    const classes = messageStyles();

    const { auth, message, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [text, setText] = useState('');
    const { id } = useParams();
    const refDisplay = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setText('');
        const msg = {
            sender: auth.user._id,
            recipient: id,
            text: text,
            createdAt: new Date().toISOString()
        }
        dispatch(addMessage(msg, auth, socket))
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getMessages(id, auth, socket));
            if (refDisplay.current) {
                refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    }, [id, dispatch, auth, socket])

    useEffect(() => {
        const currentUser = message.users.find(user => user._id === id);
        if (currentUser) setUser(currentUser);
    }, [id, message.users])

    useEffect(() => {
        document.title = "Tin nhắn";
    }, [])

    return (
        <>
            <Grid item sm={8}>
                <div className={classes.message_conversation}>
                    <div className={classes.message_box}>
                        <div className={classes.message_box_header}>
                            <div className={classes.message_box_header_left}>
                                <Avatar alt="avatar" src={user.avatar}> </Avatar>
                                <Typography style={{ marginLeft: "10px", }}>{user.fullname}</Typography>
                            </div>
                            <div className={classes.message_box_header_right}>
                                <Call style={{ marginRight: "20px", cursor: "pointer" }} />
                                <Delete style={{ color: "red", cursor: "pointer" }} />
                            </div>
                        </div>
                        <div className={classes.message_container}>
                            <div className={classes.message_chats} ref={refDisplay}>
                                {
                                    message.data.map((item, index) => (
                                        <div key={index}>
                                            {
                                                item.sender !== auth.user._id ?
                                                    <div className={classes.message_yourchat}>
                                                        <div className={classes.message_display}>
                                                            <div className={classes.message_content_your}>
                                                                <Avatar className={classes.chat_user}></Avatar>
                                                                <Typography className={classes.chat_content}>{item.text}</Typography>
                                                                <div className={classes.chat_date}>{timeAgo(new Date(item.createdAt))}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className={classes.message_mychat}>
                                                        <div className={classes.message_display}>
                                                            <div className={classes.message_content_my}>
                                                                <Avatar className={classes.chat_user}></Avatar>
                                                                <Typography className={classes.chat_content}>{item.text}</Typography>
                                                                <div className={classes.chat_date}>{timeAgo(new Date(item.createdAt))}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={classes.chat_input}>
                            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                                <input placeholder="Nhập tin nhắn..." type="text" className={classes.chat_input_form} value={text} onChange={e => setText(e.target.value)}></input>
                                {
                                    text ? <>
                                        <Send style={{ marginLeft: "30px" }}></Send>
                                    </> : <></>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    )
}
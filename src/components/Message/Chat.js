import { Typography, Avatar, Grid, IconButton,Dialog, DialogActions, DialogContent, DialogTitle,CircularProgress,Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { Call, Delete, Send } from "@material-ui/icons";
import { messageStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { useParams ,useHistory} from "react-router-dom";
import { addMessage, getMessages,deleteConversation } from '../../redux/callApi/messageCall';
import { timeAgo } from "../../utils/date";
import EmojiPicker from "../Input/EmojiPicker";

export default function Chat() {
    const classes = messageStyles();

    const { auth, message, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [text, setText] = useState('');
    const { id } = useParams();
    const refDisplay = useRef();
    const history = useHistory();
    const [state, setState] = useState({
        loading: false,
        error: false
    })
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
    const handleDelete = ()=>{
        setState({
            loading: true,
            error: false,
        })
        dispatch(deleteConversation(user,auth,() => {
            setState({
                loading: false,
                error: false
            })
            handleCloseDelete();
        }));
        history.push('/message')
    }
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => {
        setShowDelete(false);
    }
    const handleShowDelete = () => {
        setShowDelete(true);
    }
    return (
        <>
            <Grid item md={9} sm={10} xs={10}>
                <div className={classes.message_conversation}>
                    <div className={classes.message_box}>
                        <div className={classes.message_box_header}>
                            <div className={classes.message_box_header_left}>
                                <Avatar alt="avatar" src={user.avatar}> </Avatar>
                                <Typography className={classes.message_box_header_text}>{user.fullname}</Typography>
                            </div>
                            <div className={classes.message_box_header_right}>
                                <Call style={{ marginRight: "20px", cursor: "pointer" }} />
                                <IconButton onClick={handleShowDelete}>
                                    <Delete style={{ color: "red"}}/>
                                </IconButton>
                                <Dialog
                                    open={showDelete}
                                    onClose={handleCloseDelete}
                                    aria-labelledby="show-delete-dialog"
                                    aria-describedby="show-delete-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                    <DialogContent>Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!</DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDelete}>
                                            Hủy
                                        </Button>
                                        <Button onClick={handleDelete} style={{color:"red"}}>
                                            {
                                                state.loading ?
                                                    <CircularProgress size={15} color='inherit' /> : "Xóa"
                                            }                                        </Button>
                                    </DialogActions>
                                </Dialog>
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
                                                                <div style={{display:"flex"}}>
                                                                    <Avatar className={classes.chat_your_user}></Avatar>
                                                                    <Typography className={classes.chat_your_content}>{item.text}</Typography>
                                                                </div>
                                                                <div className={classes.chat_date}>{timeAgo(new Date(item.createdAt))}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className={classes.message_mychat}>
                                                        <div className={classes.message_display}>
                                                            <div className={classes.message_content_my}>
                                                                <div style={{display:"flex"}}>
                                                                    <Typography className={classes.chat_my_content}>{item.text}</Typography>
                                                                    <Avatar className={classes.chat_my_user}></Avatar>
                                                                </div>
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
                            <form style={{ display: "flex", width:"100%",justifyContent: "space-between" }} onSubmit={handleSubmit}>
                                <input placeholder="Nhập tin nhắn..." type="text" aria-multiline className={classes.chat_input_form} value={text} onChange={e => setText(e.target.value)}></input>
                                <EmojiPicker content={text} setContent={setText} />
                                <IconButton disabled={!text || text.trim() === ""} type="submit">
                                    <Send className={classes.iconSend}/>
                                </IconButton>
                            </form>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    )
}
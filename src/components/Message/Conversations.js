import { Avatar, Modal, Backdrop, Fade, Grid, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon, Typography, IconButton } from "@material-ui/core";
import { FiberManualRecord, GroupAdd } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Search, Cancel } from "@material-ui/icons";
import { messageStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux"; 
import customAxios from '../../utils/fetchData';
import { useHistory } from "react-router-dom";
import { addUser, getConversations } from '../../redux/callApi/messageCall';
// import { useParams } from "react-router-dom";
import CreateGroupChat from '../Forms/CreateGroupChat';


export default function Conversations() {
    const classes = messageStyles();

    const { auth, message, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState('');
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return setSearchUsers([]);
        try {
            const res = await customAxios().get(`/user/search_by_name?fullname=${search}`)
            setSearchUsers(res.data.users);
        } catch (err) {
            console.log(err)
        }
    }
    const handleClose = () => {
        setSearchUsers([]);
        setSearch('');
    }
    const handleAddChat = (user) => {
        setSearchUsers([]);
        setSearch('');
        dispatch(addUser(auth, user, message, socket,
            (id) => {
              history.push(`/message/${id}`);
            }));
    }
    const handleChooseGroup = (id) => {
        history.push(`/message/${id}`);
    }
    useEffect(() => {
        document.title = "Tin nhắn";
    }, []);

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations(auth, socket));
    }, [message.firstLoad, dispatch, auth, socket])
    

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };
    const handleCloseCreate = () => {
        setShow(false);
    };
    const ref = React.createRef();

    const CreateGroupChatRef = React.forwardRef((props, ref) => (
        <CreateGroupChat {...props} innerRef={ref} />
    ));

    return (
        <>
            <Grid item md={3} sm={2} xs={2}>
                <div className={classes.message_conversations}>
                    <div className={classes.message_header}>
                        <Typography className={classes.message_header_title}>TIN NHẮN</Typography>
                        <IconButton className={classes.groupButton} onClick={handleShow} >
                            <GroupAdd/>
                        </IconButton>
                        <Modal
                            aria-labelledby="create-tour"
                            aria-describedby="create-tour-modal"
                            className={classes.modal}
                            open={show}
                            onClose={handleCloseCreate}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                            timeout: 500
                            }}
                        >
                            <Fade in={show}>
                                <CreateGroupChatRef update={false} ref={ref} handleClose={handleCloseCreate} />
                            </Fade>
                        </Modal>
                    </div>
                    <div className={classes.message_search}>
                        <form className={classes.message_search_form} onSubmit={handleSearch}>
                            <Search className={classes.message_searchIcon} />
                            <input placeholder="Tìm bạn bè..." type="text" name="search" className={classes.message_input} value={search} onChange={e => setSearch(e.target.value)} />
                            {search !== '' &&
                                <IconButton onClick={() => handleClose()}>
                                    <Cancel className={classes.message_closeIcon} />
                                </IconButton>
                            }
                        </form>
                        <List className={classes.message_users_list}>
                            {
                                searchUsers.length > 0 ? <>
                                    {searchUsers.map(user => (
                                        <ListItem button key={user._id} onClick={() => handleAddChat(user)}>
                                            <ListItemAvatar>
                                                <Avatar alt="avatar" src={user.avatar}>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={user.fullname} />
                                        </ListItem>
                                    ))}
                                </> : <></>
                            }
                        </List>

                        <List className={classes.message_card_list} >
                            {
                                message.conversations.length > 0 && searchUsers.length === 0 ? <>
                                    {
                                        message.conversations.map(conversation => (
                                            <ListItem button key={conversation._id} onClick={conversation.isGroup ? ()=>handleChooseGroup(conversation._id) : () => handleAddChat(conversation.members[0])}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={conversation.members[0].avatar}>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText className={classes.message_card_text} primary={conversation.name} secondary={
                                                    conversation.latestMessage.text ? (conversation.latestMessage.text.length > 20 ? conversation.latestMessage.text.slice(0, 20) : conversation.latestMessage.text) : ""
                                                } />
                                                <ListItemIcon>
                                                    {!conversation.latestMessage.seen && <FiberManualRecord style={{ color: "#a5dec8" }} />}
                                                </ListItemIcon>
                                            </ListItem>
                                        ))
                                    }
                                </>
                                    : <></>
                            }
                        </List>
                    </div>
                </div>
            </Grid>
        </>

    )
}
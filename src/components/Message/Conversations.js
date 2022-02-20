import { Avatar, Grid, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Search, Cancel } from "@material-ui/icons";
import { messageStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import customAxios from '../../utils/fetchData';
import { useHistory } from "react-router-dom";
import { addUser, getConversations } from '../../redux/callApi/messageCall';

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
            const res = await customAxios().get(`/user/search?fullname=${search}`)
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
        dispatch(addUser(user, message, socket));
        return history.push(`/message/${user._id}`);
    }
    useEffect(() => {
        document.title = "Tin nhắn";
    }, []);

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations(auth, socket));
    }, [message.firstLoad, dispatch, auth, socket])

    return (
        <>
            <Grid item sm={3}>
                <div className={classes.message_conversations}>
                    <div className={classes.message_header}>
                        <div className={classes.message_header_right}>
                            <h2 className={classes.message_header_title}>TIN NHẮN</h2>
                        </div>
                    </div>
                    <div className={classes.message_search}>
                        <form className={classes.message_search_form} onSubmit={handleSearch}>
                            <Search className={classes.message_searchIcon} />
                            <input placeholder="Tìm bạn bè..." type="text" name="search" className={classes.message_input} value={search} onChange={e => setSearch(e.target.value)} />
                            {search !== '' && <Cancel className={classes.message_closeIcon} onClick={() => handleClose()} />}
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
                                message.users.length > 0 && searchUsers.length === 0 ? <>
                                    {
                                        message.users.map(user => (
                                            <ListItem button key={user._id} onClick={() => handleAddChat(user)}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={user.avatar}>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={user.fullname} secondary={
                                                    user.text ? user.text : user.fullname
                                                } />
                                                <ListItemIcon>
                                                    {!user.seen && <FiberManualRecord style={{ color: "#a5dec8" }} />}
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
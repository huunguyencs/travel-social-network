import { Typography, Avatar, Grid, List, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import React, { useEffect , useState} from "react";
import { Search, Cancel, Call, Delete, Send } from "@material-ui/icons";

import Header from "../../components/header/Header";
// import LeftBar from "../../components/leftbar/LeftBar";
import { messageStyles } from "../../style";
// import { profileMenu } from "../../constant/menu";
import { useDispatch, useSelector } from "react-redux";
import customAxios from '../../utils/fetchData';
import { useHistory ,useParams} from "react-router-dom";
import { addUser, addMessage, getConversations} from '../../redux/callApi/messageCall';

export default function Conversation(props) {
    const classes = messageStyles();

    const {auth, message, socket} = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState('');
    const [user, setUser] = useState('');
    const [text, setText] = useState('');
    const {id} = useParams();

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!search) return setSearchUsers([]);
        try{
            const res = await customAxios().get(`/user/search?fullname=${search}`)
            setSearchUsers(res.data.users);
            // console.log(searchUsers);
        }catch(err){
            console.log(err)
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!text.trim()) return;
        setText('');

        const msg = {
            sender: auth.user._id,
            recipient: id,
            text: text,
            createdAt: new Date().toISOString()
        }
        dispatch(addMessage(msg, auth, socket))
        // dispatch(getConversations(auth, socket))
    }

    const handleAddChat = (user) =>{
        setSearchUsers([]);
        setSearch('');
        dispatch(addUser(user, message, socket));
        return history.push(`/message/${user._id}`);
    }

    useEffect(() => {
        document.title = "Tin nhắn";
        const currentUser = message.users.find(user=> user._id === id);
        if(currentUser) setUser(currentUser);
    }, [id])

    return (
        <div>
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
                {/* <Grid item sm={3}>
                    <LeftBar
                        menuList={profileMenu}
                    />
                </Grid> */}
                <Grid item sm={4}>
                    <div className={classes.message_conversations}>
                        <div className={classes.message_header}>
                            <div className={classes.message_header_right}>
                                <h2 className={classes.message_header_title}>TIN NHẮN</h2>
                            </div>
                        </div>
                        <div className={classes.message_search}>
                            <form className={classes.message_search_form} onSubmit={handleSearch} >
                                <Search className={classes.message_searchIcon} />
                                <input placeholder="Tìm bạn bè..." type="text" name="search" className={classes.message_input} value={search} onChange={e => setSearch(e.target.value)}></input>
                                {search !== '' && <Cancel className={classes.message_closeIcon} />}
                            </form>
                            <List className={classes.message_users_list}>
                                {
                                    searchUsers.length>0 ? <>
                                        {searchUsers.map(user=>(
                                            <ListItem button key={user._id} onClick={()=>handleAddChat(user)}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={user.avatar}>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={user.fullname}/>
                                            </ListItem>
                                        ))}
                                    </> : <></>
                                }
                            </List>
                            <List className={classes.message_card_list} >
                                {
                                    message.users.length > 0 ? <>
                                        {
                                            message.users.map(user =>(
                                                <ListItem button key={user._id} onClick={()=>handleAddChat(user)}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="avatar" src={user.avatar}>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={user.fullname} secondary={
                                                        user.text ? user.text : user.fullname
                                                    } />
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
                                <div className={classes.message_chats}>
                                    {
                                        message.data.map((item, index)=>(
                                            <div key={index}>
                                                {
                                                    item.sender !== auth.user._id ?
                                                    <div className={classes.message_yourchat}>
                                                        <div className={classes.message_display}>
                                                            <div className={classes.message_content_your}>
                                                                <Avatar className={classes.chat_user}></Avatar>
                                                                <Typography className={classes.chat_content}>{item.text}</Typography>
                                                                <div className={classes.chat_date}>{item.createdAt}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className={classes.message_mychat}>
                                                        <div className={classes.message_display}>
                                                            <div className={classes.message_content_my}>
                                                                <Avatar className={classes.chat_user}></Avatar>
                                                                <Typography className={classes.chat_content}>{item.text}</Typography>
                                                                <div className={classes.chat_date}>{item.createdAt}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                               
                                            </div>
                                        ))
                                    }
                                    {/* <div className={classes.message_mychat}>
                                        <div className={classes.message_display}>
                                            <div className={classes.message_content_my}>
                                                <Avatar className={classes.chat_user}></Avatar>
                                                <Typography className={classes.chat_content}>hihiih</Typography>
                                                <div className={classes.chat_date}> 2021-10-30, 1:42:22</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.message_yourchat}>
                                        <div className={classes.message_display}>
                                            <div className={classes.message_content_your}>
                                                <Avatar className={classes.chat_user}></Avatar>
                                                <Typography className={classes.chat_content}>hihiih</Typography>
                                                <div className={classes.chat_date}> 2021-10-30, 1:42:22</div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className={classes.chat_input}>
                                <form style={{display:"flex"}} onSubmit={handleSubmit}>
                                    <input placeholder="Nhập tin nhắn..." type="text" className={classes.chat_input_form} value={text} onChange={e => setText(e.target.value)}></input>
                                    {
                                        text ? <>
                                         <Send  style={{ marginLeft: "30px" }}></Send>
                                        </>: <></>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </div>


    )
}
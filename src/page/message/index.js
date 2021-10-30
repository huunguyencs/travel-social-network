import { Container, makeStyles, Typography, Avatar} from "@material-ui/core";

import { Grid } from "@material-ui/core";
import React from "react";
import { Accessibility, Explore, Home, SupervisorAccount, Tune, Search, Cancel, Call,Delete,Send} from "@material-ui/icons";

import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";

import InputComment from "../../components/input/comment";

import {List, ListItem, ListItemText, ListItemAvatar} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    message_conversations:{
        borderRight: "1px solid #d2d0d0",
        borderLeft: "1px solid #d2d0d0",
        minHeight: "92vh",
        height: "auto",
        paddingTop:"70px",
        width:"100%"
    },
    message_header:{
        position:"fixed",
        display:"flex",
        alignItems:"center",
        height:"50px",
        borderBottom:"1px solid #d2d0d0",
        minWidth: "25%"
    },
    message_header_title:{
        marginLeft:"20px",
        fontSize: "17px",
        fontWeight: 800,
        color: "#0f1419"
    },
    message_search:{
        position:"fixed",
        width:"25%",
        marginTop:"50px",
        height:"50px"
    },
    message_search_form:{
        height:"100%",
        width:"100%",
        display:"flex",
        alignItems:"center",
        borderBottom:"1px solid #d2d0d0"
    },
    message_input:{
        width: "80%",
        height: "80%",
        padding: "0 5px",
        border: "none",
        outline: "none",
        fontSize: "15px",
        marginLeft: "5px",
        backgroundColor: "rgb(238, 246, 243)"
    },
    message_searchIcon:{
        marginLeft:"20px",
        color:"#d2d0d0",
        fontSize:"30px"
    },
    message_closeIcon:{
        color:"#A5DEC8",
        fontSize:"30px",
        marginRight:"20px"
    },
    message_users_list:{
        position: "absolute",
        top: "100%",
        left: "0",
        width: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
        zIndex: 20,
        display:"none"
    },
    message_card_list:{ 
        maxHeight: "80vh",
        overflowY: "auto",
    }, 


    message_conversation:{
        width: "90%",
        minHeight: "92vh",
        borderRight: "1px solid #d2d0d0",
        paddingTop: "70px"
    },
    message_box:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column"
    },
    message_box_header:{
        display: "flex",
        justifyContent:"space-between",
        alignItems: "center",
        padding:"0 3%",
        borderBottom: "1px solid #d2d0d0",
        height: "50px",
        width: "94%"
    },
    message_box_header_left:{
        display:"flex",
        alignItems:"center"
    },

    message_container:{
        position: "relative",
        height: "76vh",
        overflowY: "auto",
        width: "100%"
    },
    message_chats:{
        width:"96%",
        minHeight:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 2%",
        },
    message_mychat:{
        display: "flex",
        width: "100%",
        margin: "10px 0 20px",
        justifyContent:"flex-end"
    },
    message_display:{
        maxWidth:"70%"
    },
    message_content_my:{
        display:"flex",
        flexDirection: "column",
        width:"100%",
        alignItems: "flex-end"
    },
    message_content_your:{
        display:"flex",
        flexDirection: "column",
        width:"100%",
        alignItems: "flex-start"
    },
    chat_content:{
        backgroundColor:"#A5DEC8",
        color:"white",
        fontSize:"15px",
        fontWeight: 500,
        borderRadius: "10px",
        padding:"8px"
    },
    chat_date:{
        fontSize:"13px",
        color:"black",
        marginTop:"3px"
    },
    chat_user:{
        width:"30px",
        height:"30px",
        marginBottom:"3px"
    },
    message_yourchat:{
        display: "flex",
        width: "100%",
        margin: "10px 0 20px"
    },
    chat_input:{
        height: "6vh",
        display:"flex",
        width: "100%",
        border:"1px solid  #d2d0d0",
        alignItems:"center" 
    },
    chat_input_form:{
        width:"90%",
        height:"90%",
        backgroundColor:"rgb(238, 246, 243)",
        border: "none",
        outline: "none",
    }
}));

export default function  Message(props) {
    const classes = useStyles();

    return (
        <div>
            <Header/>
            <Grid container style={{ margin: 0, padding: 0 }}>
                <Grid item sm={3}>
                <LeftBar
                    menuList={[
                    {
                        name: "Giới Thiệu",
                        icon: Home,
                        active: false,
                    },
                    {
                        name: "Bài Viết",
                        icon: Explore,
                        active: true,
                    },
                    {
                        name: "Hành Trình",
                        icon: Accessibility,
                        active: false,
                    },
                    {
                        name: "Nhóm",
                        icon: SupervisorAccount,
                        active: false,
                    },
                    {
                        name: "Thay đổi thông tin",
                        icon: Tune,
                        active: false,
                    }
                    ]}
                />
                </Grid>
                <Grid item sm={3}>
                    <div className={classes.message_conversations}>  
                        <div className={classes.message_header}>
                            <div className={classes.message_header_right}>
                                <h2 className={classes.message_header_title}>MESSAGES</h2>
                            </div>
                        </div> 
                        <div className={classes.message_search}>
                            <form className={classes.message_search_form}>
                                <Search className={classes.message_searchIcon}/>
                                <input placeholder="Tìm bạn bè..." type="text" name="search" className={classes.message_input}></input>
                                <Cancel className={classes.message_closeIcon}/>
                            </form>
                            <List className={classes.message_users_list}>
                                <ListItem button>
                                    <ListItemAvatar>
                                    <Avatar alt="avatar" src="">
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tran Van An"  />
                                </ListItem>
                                <ListItem button>
                                    <ListItemAvatar>
                                    <Avatar alt="avatar" src="">
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tran Van Be"  />
                                </ListItem>
                            </List>
                            <List className={classes.message_card_list} >
                                <ListItem button>
                                    <ListItemAvatar>
                                    <Avatar alt="avatar" src="">
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tran Van An" secondary="tin nhan" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemAvatar>
                                    <Avatar alt="avatar" src="">
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tran Van Be" secondary="tin nhan" />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div className={classes.message_conversation}>
                        <div className={classes.message_box}>
                            <div className={classes.message_box_header}>
                                <div className={classes.message_box_header_left}>
                                    <Avatar/>
                                    <Typography style={{marginLeft:"10px",}}>Tran van A</Typography>
                                </div>
                                <div className={classes.message_box_header_right}>
                                    <Call style={{marginRight:"20px",cursor:"pointer"}}/>
                                    <Delete style={{color:"red", cursor:"pointer"}}/>
                                </div>
                            </div>
                            <div className={classes.message_container}>
                                <div className={classes.message_chats}>
                                    <div className={classes.message_mychat}>
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
                                    </div>
                                </div>
                            </div>
                            <div className={classes.chat_input}>
                                <input placeholder="Nhập tin nhắn..." type="text" className={classes.chat_input_form}></input>
                                <Send style={{marginLeft:"30px"}}></Send>                            
                            </div>
                        </div> 
                    </div>
                </Grid>
                
            </Grid>
        </div>
       

    )
}
import { Container, makeStyles, Typography, Avatar} from "@material-ui/core";

import { Grid } from "@material-ui/core";
import React from "react";
import { Accessibility, Explore, Home, SupervisorAccount, Tune, Search, Cancel} from "@material-ui/icons";

import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";

const useStyles = makeStyles((theme) => ({
    message_conversations:{
        borderRight: "1px solid #d2d0d0",
        borderLeft: "1px solid #d2d0d0",
        minHeight: "100vh",
        height: "auto",
        marginTop:"65px",
        width:"100%"
    },
    message_conversation:{
        width: "90%",
        height: "auto",
        minHeight: "100vh",
        borderRight: "1px solid #d2d0d0",
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
    message_user:{
        display:"flex",
        justifyContent:" flex-start",
        alignItems:"center",
        borderBottom:"1px solid #d2d0d0",
        padding: "16px 20px"
    },
    userName:{
        marginLeft:"20px",
        fontWeight:700,
    },
    message_card_list:{ 
        maxHeight: "80vh",
        overflowY: "auto",
    }, 
    message_active:{
        borderRight:"1px solid #A5DEC8",
        width:"100%"
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
                            <ul className={classes.message_users_list}>
                                <li>
                                    <a href="#"  className={classes.message_user}>
                                        <Avatar className={classes.avatar} alt="avatar" src="" />
                                        <Typography className={classes.userName}>Trần Văn A</Typography>
                                    </a>
                                </li>
                            </ul>
                            <div className={classes.message_card_list}>
                                <a href="#"  className={classes.message_user}>
                                    <Avatar className={classes.avatar} alt="avatar" src="" />
                                    <div >
                                        <Typography className={classes.userName}>Trần Văn A</Typography>
                                        <Typography className={classes.userName}>tin nhan</Typography>
                                    </div>
                                </a>
                                <a href="#"  className={classes.message_user}>
                                    <Avatar className={classes.avatar} alt="avatar" src="" />
                                    <div >
                                        <Typography className={classes.userName}>Trần Văn A</Typography>
                                        <Typography className={classes.userName}>tin nhan</Typography>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div className={classes.message_conversation}>
                        
                    </div>
                </Grid>
                
            </Grid>
        </div>
       

    )
}
import { Typography, Avatar, Grid, List, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import React from "react";
import { Search, Cancel, Call, Delete, Send } from "@material-ui/icons";

import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import { messageStyles } from "../../style";
import { profileMenu } from "../../constant/menu";


export default function Message(props) {
    const classes = messageStyles();

    return (
        <div>
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
                <Grid item sm={3}>
                    <LeftBar
                        menuList={profileMenu}
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
                                <Search className={classes.message_searchIcon} />
                                <input placeholder="Tìm bạn bè..." type="text" name="search" className={classes.message_input}></input>
                                <Cancel className={classes.message_closeIcon} />
                            </form>
                            <List className={classes.message_users_list}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src="">
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tran Van An" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src="">
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Tran Van Be" />
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
                                    <Avatar />
                                    <Typography style={{ marginLeft: "10px", }}>Tran van A</Typography>
                                </div>
                                <div className={classes.message_box_header_right}>
                                    <Call style={{ marginRight: "20px", cursor: "pointer" }} />
                                    <Delete style={{ color: "red", cursor: "pointer" }} />
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
                                <Send style={{ marginLeft: "30px" }}></Send>
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </div>


    )
}
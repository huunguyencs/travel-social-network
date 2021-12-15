import { Typography, Avatar, Grid, List, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import React, { useState } from "react";
import { Search, Cancel } from "@material-ui/icons";

import Header from "../../components/header/Header";
// import LeftBar from "../../components/leftbar/LeftBar";
import { messageStyles } from "../../style";
// import { profileMenu } from "../../constant/menu";


export default function Message(props) {
    const classes = messageStyles();

    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch('');
    }

    return (
        <div>
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
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
                                {search !== '' && <Cancel className={classes.message_closeIcon} />}
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
                <Grid item sm={8}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography style={{ marginTop: 300 }} variant="h5">
                            Bắt đầu trò chuyện
                        </Typography>
                    </div>
                </Grid>

            </Grid>
        </div>


    )
}
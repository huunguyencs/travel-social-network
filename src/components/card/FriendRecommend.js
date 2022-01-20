import React from "react";
import { Avatar, Card, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";

import { friendCardStyles } from "../../style";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function FriendRecommendCard(props) {

    const { friendsRecommend } = useSelector(state => state.auth);

    const history = useHistory();

    const classes = friendCardStyles();


    return (
        <Card className={classes.friend}>
            <Typography variant="h5">Gợi ý theo dõi</Typography>
            <div>
                <List className={classes.list}>
                    {friendsRecommend?.length > 0 ?
                        friendsRecommend.map((item) => (
                            <ListItem key={item._id} button className={classes.item} onClick={() => history.push(`/u/${item._id}`)}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} alt="avatar" src={item.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.fullname}
                                    classes={{ primary: classes.text }}
                                />
                            </ListItem>
                        )) :
                        <div>Không tìm thấy dữ liệu gợi ý</div>}
                </List>

            </div>
        </Card>
    )
}
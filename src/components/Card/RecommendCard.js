import React from "react";
import { Card, List, Typography} from "@material-ui/core";
import {PersonAddOutlined} from "@material-ui/icons";
import { friendCardStyles } from "../../style";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function RecommendCard(props) {

    const { friendsRecommend } = useSelector(state => state.auth);

    const history = useHistory();

    const classes = friendCardStyles();


    return (
        <Card className={classes.friend}>
            <div className={classes.friendHeader}>
                <Typography style={{fontSize: 18}}>Gợi ý theo dõi</Typography>
            </div>
            <div>
                <List className={classes.list}>
                    {friendsRecommend?.length > 0 ?
                        friendsRecommend.map((item) => (
                            <div className={classes.friendBlock}>
                                <img className={classes.friendAvatar} src={item.avatar} alt="avatar"  onClick={() => history.push(`/u/${item._id}`)} />
                                <div className={classes.friendInfo} onClick={() => history.push(`/u/${item._id}`)}>
                                    <Typography >{item.fullname}</Typography>
                                    <Typography>{item.fullname}</Typography>
                                </div>
                                <div className={classes.addFriend}>
                                    <PersonAddOutlined /> 
                                </div>
                            </div>
                        )) :
                        <div>Không có bạn bè gợi ý</div>}
                </List>

            </div>
        </Card>
    )
}
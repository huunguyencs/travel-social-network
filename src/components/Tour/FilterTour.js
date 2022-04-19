import React from "react";
import { Card, List, Typography} from "@material-ui/core";
import {PersonAddOutlined} from "@material-ui/icons";
import { friendCardStyles } from "../../style";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function FilterTour(props) {

    const { auth } = useSelector(state => state.auth);

    const history = useHistory();

    const classes = friendCardStyles();


    return (
        <Card className={classes.friend}>
            <div className={classes.friendHeader}>
                <Typography style={{fontSize: 18}}>Gợi ý theo dõi</Typography>
            </div>
            <div>
                <List className={classes.list}>
                </List>
            </div>
        </Card>
    )
}
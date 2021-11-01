import React from "react";
import {
    Avatar,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";

import Calendar from '../card/CalendarCard';
import { rightbarStyles } from "../../style";

export default function RightBar(props) {
    const classes = rightbarStyles();

    return (
        <Container className={classes.container}>
            <Calendar />
            <div className={classes.friend}>
                <Typography variant="h5">Gợi ý kết bạn</Typography>
                <div>
                    <List className={classes.list}>
                        <ListItem button className={classes.item}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar} alt="avatar" src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Nguyễn Văn A"
                                classes={{ primary: classes.text }}
                            />
                        </ListItem>
                        <ListItem button className={classes.item}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar} alt="avatar" src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Nguyễn Văn A"
                                classes={{ primary: classes.text }}
                            />
                        </ListItem>
                        <ListItem button className={classes.item}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar} alt="avatar" src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Nguyễn Văn A"
                                classes={{ primary: classes.text }}
                            />
                        </ListItem>
                    </List>

                </div>
            </div>
        </Container>

    )
}
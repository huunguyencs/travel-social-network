import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
// import { AccountCircle } from "@material-ui/icons";
import React from "react";
import Calendar from "react-calendar";
import './calendar.css';

const useStyles = makeStyles((theme) => ({
    container: {
        color: 'white',
        paddingTop: theme.spacing(10),
        position: "sticky",
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        top: 0,
        alignItems: 'center'
    },

    friend: {
        borderRadius: 20,
        color: "#2F3542",
        padding: 20,
        backgroundColor: "#EEF6F3",
    },
    text: {
        fontSize: "1.15em",
        fontWeight: 500,
    },
    item: {
        borderRadius: 20,
        paddingInline: theme.spacing(5),
    },
    list: {

    }
}));

export default function RightBar(props) {
    const classes = useStyles();

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
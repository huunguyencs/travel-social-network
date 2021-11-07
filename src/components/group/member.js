import React from "react";

import { Avatar, Container, Divider, Typography } from "@material-ui/core";

import profileStyles from "../../style";

import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";

const listAdmin = [
    {
        menberId: 1,
        name: "Trần Văn An",
        avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
    },
    {
        menberId: 2,
        name: "Trần Văn An",
        avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
    },
]
const listMenber = [

    {
        menberId: 1,
        name: "Trần Văn An",
        avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
        admin: false,
    },
    {
        menberId: 2,
        name: "Trần Văn An",
        avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
        admin: false,
    },
    {
        menberId: 3,
        name: "Trần Văn An",
        avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
        admin: false,
    },
    {
        menberId: 4,
        name: "Trần Văn An",
        avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
        admin: false,
    },
]

function GroupMember(props) {
    const classes = profileStyles();
    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
                <div className={classes.admin}
                    style={{
                        padding: "30px"
                    }}
                >
                    <Typography>
                        Quản trị viên
                    </Typography>
                    <div className={classes.listAdmin}>
                        <List
                            style={{
                                alignItems: "center",
                            }}
                        >
                            {listAdmin.map(item => (
                                <ListItem
                                    style={{
                                        backgroundColor: "#DFE4EA",
                                        borderRadius: "10px",
                                        marginTop: "20px",
                                        width: "80%",
                                        padding: "10px",
                                        marginLeft: "50px"
                                    }}
                                >
                                    <Avatar
                                        className={classes.group_avatar__img}
                                        src={item.avatar}
                                        alt="avatar"
                                    />
                                    <Typography>{item.name}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
                <Divider></Divider>
                <div className={classes.admin}
                    style={{
                        padding: "30px"
                    }}
                >
                    <Typography>
                        Thành viên
                    </Typography>
                    <div className={classes.listMenber}>
                        <List>
                            {listMenber.map(item => (
                                <ListItem
                                    style={{
                                        backgroundColor: "#DFE4EA",
                                        borderRadius: "10px",
                                        marginTop: "20px",
                                        width: "80%",
                                        padding: "10px",
                                        marginLeft: "50px"
                                    }}
                                >
                                    <Avatar
                                        className={classes.group_avatar__img}
                                        src={item.avatar}
                                        alt="avatar"
                                    />
                                    <Typography>{item.name}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default GroupMember;

import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { modalListStyles } from "../../style";

export default function UserList(props) {

    const classes = modalListStyles();

    return (
        <div className={classes.paper}>
            <div className={classes.modal_header}>
                <h2 className={classes.modal_header_left}>{props.title}</h2>
                <div className={classes.modal_header_right}>
                    <IconButton>
                        <Close className={classes.modal_header_closeIcon} onClick={props.handleClose} />
                    </IconButton>
                </div>
            </div>
            <List className={classes.modal_body}>
                {props.listUser.map((user) => (
                    <ListItem button className={classes.modal_body_user} key={user._id}>
                        <ListItemAvatar>
                            <Avatar alt="avatar" src={user.avatarImage} />
                        </ListItemAvatar>
                        <ListItemText primary={user.lastName + " " + user.firstName} />
                        <ListItemSecondaryAction>
                            <Button variant="outlined" className={classes.modal_body_user_button}  >
                                Follow
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}

            </List>
        </div>
    )
}
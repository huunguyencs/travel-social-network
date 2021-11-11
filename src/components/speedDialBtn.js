import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Create, Explore, WhatsApp } from "@material-ui/icons";
import { speedDialStyles } from "../style";
import { Link, useHistory } from "react-router-dom";
import { Fade, IconButton, Modal, Backdrop } from "@material-ui/core";
import CreatePostForm from "./forms/createPost";
import CreateTourForm from "./forms/createTour";
import { useSelector } from "react-redux";

const actions = [
    { icon: < CreatePostIcon />, name: "Create Post" },
    { icon: < CreateTourIcon />, name: "Create Tour" },
    { icon: <IconButton component={Link} to={"/message"}><WhatsApp /></IconButton>, name: "Message" },
]

function CreatePostIcon(props) {
    const [show, setShow] = useState(false);

    const classes = speedDialStyles();

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }
    return (
        <>
            <IconButton onClick={handleShow}><Create /></IconButton>
            <Modal
                aria-labelledby="create-post"
                aria-describedby="create-post-modal"
                className={classes.modal}
                open={show}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <CreatePostForm />
                </Fade>
            </Modal>
        </>
    )
}

function CreateTourIcon(props) {
    const [show, setShow] = useState(false);

    const { createTour } = useSelector(state => state);
    const history = useHistory();

    const classes = speedDialStyles();

    const handleShow = () => {
        if (createTour.tour.length > 0) {
            history.push("/createtour");
        }
        else {
            setShow(true);
        }

    }

    const handleClose = () => {
        setShow(false);
    }



    return (
        <>
            <IconButton onClick={handleShow}><Explore /></IconButton>
            <Modal
                aria-labelledby="create-tour"
                aria-describedby="create-tour-modal"
                className={classes.modal}
                open={show}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <CreateTourForm />
                </Fade>
            </Modal>
        </>
    )
}




export default function SpeedDialButton(props) {

    const classes = speedDialStyles();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <div className={classes.speedDialWrapper}>
            <SpeedDial
                ariaLabel="SpeedDial Button"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="up"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}

            </SpeedDial>
        </div>
    )
}
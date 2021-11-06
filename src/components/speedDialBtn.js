import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { CardTravel, Create, Message } from "@material-ui/icons";
import { speedDialStyles } from "../style";

const actions = [
    { icon: <Create />, name: "Create Post" },
    { icon: <CardTravel />, name: "Create Tour" },
    { icon: <Message />, name: "Message" },
]


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
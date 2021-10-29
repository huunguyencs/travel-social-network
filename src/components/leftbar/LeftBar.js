import React, { useState } from "react";
import {
    Container,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Collapse,
    Link
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { leftbarStyles } from "../../style";

export default function LeftBar(props) {
    const [more, setMore] = useState(false);

    const classes = leftbarStyles({ more });

    return (
        <Container className={classes.container} elevation={15}>
            <List className={classes.panel}>
                {props.menuList.slice(0, 3).map((item) => (
                    <Link style={{ textDecoration: "none", }}>
                        <ListItem button className={item.active ? [classes.item, classes.itemActive] : classes.item}>
                            <ListItemIcon>
                                {<item.icon className={classes.icon} />}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                classes={{ primary: classes.text }}
                            />
                        </ListItem>
                    </Link>
                ))}
                <Collapse in={more}>
                    {props.menuList.slice(3).map((item) => (
                        <Link style={{ textDecoration: "none", }}>
                            <ListItem button className={item.active ? [classes.item, classes.itemActive] : classes.item}>
                                <ListItemIcon>
                                    {<item.icon className={classes.icon} />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    classes={{ primary: classes.text }}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </Collapse>
                <ListItem button className={classes.item} onClick={() => setMore(!more)}>
                    <ListItemIcon>
                        {more ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
                    </ListItemIcon>
                    <ListItemText
                        primary={more ? "Thu gọn" : "Xem thêm"}
                        classes={{ primary: classes.text }}
                    />
                </ListItem>
            </List>
        </Container>

    )
}
import React, { useState } from "react";
import {
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Collapse
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

import { leftbarStyles } from "../../style";

export default function Menu(props) {

    const location = useLocation();

    const [more, setMore] = useState(false);

    const classes = leftbarStyles({ more });

    const isActive = (path) => {
        // if (path === "/" && location.pathname === "/home") return true;
        // return path === location.pathname;
        if (props.menuList.prefix === "" || props.menuList.prefix === "admin") {
            return location.pathname === path;
        }
        else {

            const tmp = location.pathname.split("/");
            if (tmp.length === 3 && path === "/") return true;
            return "/" + tmp[tmp.length - 1] === path;
        }
    }

    const renderLink = (link) => {
        if (props.menuList.prefix === "" || props.menuList.prefix === "admin")
            return link;
        return "." + link;
    }

    const menuList = props.menuList;
    const hasMoreBtn = menuList.menu.length > 4 ? true : false;

    return (


        <List className={classes.panel}>
            {menuList.menu.slice(0, 4).map((item) => (
                <Link style={{ textDecoration: "none", }} to={renderLink(item.link)}>
                    <ListItem button className={isActive(item.link) ? [classes.item, classes.itemActive] : classes.item}>
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
            {
                hasMoreBtn && (
                    <>
                        <Collapse in={more}>
                            {menuList.menu.slice(4).map((item) => (
                                <Link style={{ textDecoration: "none", }} to={renderLink(item.link)}>
                                    <ListItem button className={isActive(item.link) ? [classes.item, classes.itemActive] : classes.item}>
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
                    </>
                )
            }

        </List>
    )
}
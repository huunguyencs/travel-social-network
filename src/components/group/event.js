import React from "react";

import { Avatar, Container, Divider, Typography } from "@material-ui/core";

import profileStyles from "../../style";

import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { CheckCircle, Stars } from "@material-ui/icons";

const listEvent = [

    {
        eventId: 1,
        name: "Du lịch Quảng Nam",
        time: "Thứ 7, 06/11/2021",
        img: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",
        user: "Trần Văn An"
    },
    {
        eventId: 2,
        name: "Du lịch Quảng Nam",
        time: "Thứ 7, 06/11/2021",
        img: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",
        user: "Trần Văn An"
    },
    {
        eventId: 3,
        name: "Du lịch Quảng Nam",
        time: "Thứ 7, 06/11/2021",
        img: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",
        user: "Trần Văn An"
    },
    {
        eventId: 4,
        name: "Du lịch Quảng Nam",
        time: "Thứ 7, 06/11/2021",
        img: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",
        user: "Trần Văn An"
    },
]

function GroupEvent(props) {
    const classes = profileStyles();
    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
                <div className={classes.admin}
                    style={{
                        padding: "30px"
                    }}
                >
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                    >
                        <Typography>
                            Sự kiện
                        </Typography>
                        <Typography>
                            Tạo sự kiện
                        </Typography>
                    </div>
                    
                    <div className={classes.listAdmin}>
                        <List
                            style={{
                                alignItems: "center",
                            }}
                        >
                            {listEvent.map(item => (
                                <ListItem
                                    style={{
                                        backgroundColor: "#DFE4EA",
                                        borderRadius: "10px",
                                        width: "80%",
                                        height: "150px",
                                        flexDirection: "row",
                                        display: "flex",
                                        marginTop: "20px",
                                        marginLeft: "50px",
                                        alignItems: "center"
                                    }}
                                >
                                    <div
                                    style={{
                                        width: "150px"
                                    }}
                                    >
                                        <img
                                            className={classes.event_ItemImage}
                                            style={{ borderRadius: "10px", width: "130px", height: "130px"}}
                                            src= {item.img}
                                            alt="cover"
                                        />
                                    </div>
                                    <div
                                    style={{
                                        width: "300px"
                                    }}
                                    >
                                        <Typography>{item.name}</Typography>
                                        <Typography>{item.time}</Typography>
                                        <Typography>Người tạo: {item.user}</Typography>
                                        <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                        >
                                            <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                            >
                                                <Stars></Stars>
                                                <Typography>Quan Tâm</Typography>
                                            </div>
                                            <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                            >
                                                <CheckCircle></CheckCircle>
                                                <Typography>Sẽ tham gia</Typography>
                                            </div>
                                        </div>
                                    </div>   
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default GroupEvent;

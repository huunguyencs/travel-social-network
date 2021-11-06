import React from "react";
import { Group, GroupAdd, GroupWork, LocationOn, Public, RemoveRedEye } from "@material-ui/icons";
import { Avatar, Container, Divider, Typography } from "@material-ui/core";

import profileStyles from "../../style";



function GroupIntro(props) {
    const classes = profileStyles();
    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "20px" }}>
                <div style={{ margin: "10px" }}>
                    <Typography>Giới thiệu về nhóm này</Typography>
                </div>
                <Divider></Divider>
                <div
                    style={{
                        padding: "10px"
                    }}
                >

                    <div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "10px",
                            }}
                        >
                            <Typography>Chia sẻ kinh nghiệm du lịch</Typography>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "10px",
                            }}
                        >
                            <div>
                                <Public></Public>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <Typography>Công khai</Typography>
                                <Typography>Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng.</Typography>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "10px",
                            }}
                        >
                            <div>
                                <RemoveRedEye></RemoveRedEye>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <Typography>Hiển thị</Typography>
                                <Typography>Ai cũng có thể tìm nhóm này.</Typography>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "10px",
                            }}
                        >
                            <div>
                                <LocationOn></LocationOn>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <Typography>Quảng Nam</Typography>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "10px",
                            }}
                        >
                            <div>
                                <Group></Group>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <Typography>Tổng quát</Typography>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "10px",
                            }}
                        >
                            <div>
                                <Group></Group>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <Typography>Lịch sử</Typography>
                                <Typography>Đã tạo nhóm vào 12 tháng 11, 2019.</Typography>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", marginTop: "20px", padding: "20px" }}>
                <div style={{ margin: "10px" }}>
                    <Typography>Thành viên</Typography>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px" }}>
                    <div className={classes.group_list_menber} style={{ display: 'flex', flexDirection: 'row' }}>
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                    </div>
                    <Typography>Có 3 người bạn của bạn đang tham gia nhóm này</Typography>
                </div>
                <div style={{ padding: "20px" }}>
                    <div className={classes.group_list_menber} style={{ display: 'flex', flexDirection: 'row' }}>
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                        <Avatar
                            className={classes.group_avatar__img}
                            src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                            alt="avatar"
                        />
                    </div>
                    <Typography>Trần Văn An là quản trị viên</Typography>
                </div>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", marginTop: "20px", padding: "20px" }}>
                <div style={{ margin: "10px" }}>
                    <Typography>Hoạt động</Typography>
                </div>
                <Divider></Divider>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                    }}
                >
                    <div>
                        <GroupAdd></GroupAdd>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <Typography>Hôm nay có 24 bài viết mới</Typography>
                        <Typography>Tổng cộng 1000 bài viết</Typography>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                    }}
                >
                    <div>
                        <Group></Group>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <Typography>Có 2 thành viên với tham gia</Typography>
                        <Typography>Tổng cộng 1000 thành viên</Typography>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                    }}
                >
                    <div>
                        <GroupWork></GroupWork>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <Typography>Ngày tạo: 1 năm trước</Typography>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default GroupIntro;

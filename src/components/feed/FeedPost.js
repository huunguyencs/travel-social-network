import { Container, InputBase, makeStyles, alpha, Button, Zoom } from "@material-ui/core";
import Post from '../post/Post';

import React, { useState } from "react";
import { AddCircleOutline, Create } from "@material-ui/icons";

const listPost = [
    {
        user: {
            avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
            name: "Trần Văn A",
        },
        time: "26 Thg 10 2021",
        imgList: [
            {
                img: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",
                title: "img1",
            },
            {
                img: "https://static.dalaco.travel/intranet/images/thoi-gian-cau-rong-phun-lua-da-nang.jpg",
                title: "img2",
            }
        ],
        content: "Đây là content. Tôi đang thấy vui ...",
        numLike: 12,
        liked: true,
        cmts: [
            {
                user: {
                    avatar: "",
                    name: "Nguyễn Văn C"
                },
                content: "Đây là comment",
                time: "27 Thg 10 2021",
                numLike: 1,
                liked: false,
            },
            {
                user: {
                    avatar: "",
                    name: "Nguyễn Văn D"
                },
                content: "Comment",
                time: "26 Thg 10 2021",
                numLike: 2,
                liked: true,
            }
        ]
    },
    {
        user: {
            avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
            name: "Trần Văn B",
        },
        time: "27 Thg 10 2021",
        imgList: [
            {
                img: "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                title: "img1",
            },
            {
                img: "https://znews-photo.zadn.vn/w660/Uploaded/ngtmns/2016_06_24/1.jpg",
                title: "img2",
            },
            {
                img: "https://znews-photo.zadn.vn/w660/Uploaded/ngtmns/2016_06_24/1.jpg",
                title: "img3",
            }
        ],
        content: "Cảnh đẹp Việt Nam",
        numLike: 10,
        liked: false,
        cmts: [],
    },
    {
        user: {
            avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
            name: "Phạm C",
        },
        time: "26 Thg 10 2021",
        imgList: [
            {
                img: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",
                title: "img1",
            },
            // {
            //     img: "https://static.dalaco.travel/intranet/images/thoi-gian-cau-rong-phun-lua-da-nang.jpg",
            //     title: "img2",
            // }
        ],
        content: "Đây là content. Tôi đang thấy vui ...",
        numLike: 5,
        liked: true,
        cmts: [
            {
                user: {
                    avatar: "",
                    name: "Nguyễn Văn C"
                },
                content: "Đây là comment",
                time: "27 Thg 10 2021",
                numLike: 1,
                liked: false,
            },
            {
                user: {
                    avatar: "",
                    name: "Phạm C"
                },
                content: "Comment",
                time: "28 Thg 10 2021",
                numLike: 0,
                liked: false,
            }
        ]
    }
]

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
        alignContent: "center",
    },
    content: {
        // marginLeft: theme.spacing(10),
        // marginRight: theme.spacing(10),
    },
    create: {
        margin: 30,
        marginBottom: 50,
    },
    containerText: {
        backgroundColor: "#EEF6F3",
        paddingInline: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: 20,
        border: "1px solid rgba(47, 53, 66, 0.5)",
        "&:hover": {
            backgroundColor: alpha("#aaa", 0.15),
        },
        height: (props) => props.show ? "5em" : "2em",
    },
    createText: {
        width: "100%",

    },
    menuCreate: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 5,
        marginInline: 20,
    },
    addImageButton: {
        borderRadius: 10,
        padding: 10,
        paddingInline: 30,
        backgroundColor: "#A4B0BE",
    },
    postButton: {
        borderRadius: 10,
        padding: 10,
        paddingInline: 30,
        backgroundColor: "#2ED573",
    },
}));

export default function Feed(props) {

    const [show, setShow] = useState(false);

    const classes = useStyles({ show });



    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <div className={classes.containerText}>
                        <InputBase
                            placeholder="Bạn đang nghĩ gì?..."
                            className={classes.createText}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setShow(false);
                                }
                                else setShow(true);
                            }}
                            rows={show ? 3 : 1}
                            multiline
                        />
                    </div>
                    <div className={classes.menuCreate}>
                        <Zoom in={show}>
                            <Button className={classes.addImageButton}>
                                <AddCircleOutline style={{ marginRight: 10 }} />
                                Thêm ảnh
                            </Button>
                        </Zoom>
                        <Zoom in={show}>
                            <Button className={classes.postButton}>
                                <Create style={{ marginRight: 10 }} />
                                Đăng
                            </Button>
                        </Zoom>

                    </div>

                </div>


                <div>
                    {
                        listPost.map((post) => (
                            <Post
                                post={post}
                            />
                        ))
                    }
                </div>
            </div>
        </Container>
    )
}
import { Container, InputBase, makeStyles, alpha } from "@material-ui/core";
import Post from "./Post";

import React from "react";

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
        backgroundColor: "#EEF6F3",
        paddingInline: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: 20,
        border: "1px solid rgba(47, 53, 66, 0.5)",
        "&:hover": {
            backgroundColor: alpha("#aaa", 0.15),
        }


    },
    createText: {
        width: "100%",
    }
}));

export default function Feed(props) {
    const classes = useStyles();

    const listPost = [
        {
            user: {
                avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
                name: "Trần Văn A",
            },
            time: "October 26, 2021",
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
            numCmt: 2
        },
        {
            user: {
                avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
                name: "Trần Văn B",
            },
            time: "October 27, 2021",
            imgList: [
                {
                    img: "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                    title: "img1",
                },
                {
                    img: "https://znews-photo.zadn.vn/w660/Uploaded/ngtmns/2016_06_24/1.jpg",
                    title: "img2",
                }
            ],
            content: "Cảnh đẹp Việt Nam",
            numLike: 10,
            numCmt: 5,
        },

    ]

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <InputBase
                        placeholder="Bạn đang nghĩ gì?..."
                        className={classes.createText}
                    />
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
        </Container>
    )
}
import React from "react";
import { Container } from "@material-ui/core";

import Post from '../post/Post';
import { feedStyles } from "../../style";


const listReview = [
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
        rate: 5,
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
        rate: 4,
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
        rate: 4,
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


export default function FeedReview(props) {

    const classes = feedStyles();



    return (
        <Container className={classes.container}>
            <div className={classes.content}>

                <div>
                    {
                        listReview.map((post) => (
                            <Post
                                post={post}
                                isReview={true}
                            />
                        ))
                    }
                </div>
            </div>
        </Container>
    )
}
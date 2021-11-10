import React, { useEffect, useState } from "react";
import { Container, InputBase, Modal, Backdrop, Fade } from "@material-ui/core";


import Post from '../post/Post';
import { feedStyles } from "../../style";
import CreatePostForm from "../forms/createPost";


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


export default function FeedPost(props) {

    const [show, setShow] = useState(false);

    const classes = feedStyles();

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        console.log("Render post list");
        // call api to get list posts

    }, [])


    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <div className={classes.containerText}>
                        <InputBase
                            placeholder="Bạn đang nghĩ gì?..."
                            className={classes.createText}
                            onClick={handleShow}
                            rows={1}
                        />
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
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

                </div>


                <div>
                    {
                        listPost.map((post) => (
                            <Post
                                post={post}
                                isReview={false}
                            />
                        ))
                    }
                </div>
            </div>
        </Container>
    )
}
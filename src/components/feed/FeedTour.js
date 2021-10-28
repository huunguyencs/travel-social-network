import { Container, makeStyles } from "@material-ui/core";
// import Tour from "./Tour";
import Tour from "../tour/Tour";

import React from "react";
// import { AddCircleOutline, Create } from "@material-ui/icons";

const listPost = [
    {
        user: {
            avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
            name: "Trần Văn A",
        },
        time: "3 ngày 2 đêm",
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
        title: "Du lịch Hà Nội",
        cost: "200.000 VND",
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
        time: "2 ngày 1 đêm",
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
        title: "Du lịch Phú Quốc",
        cost: "300.000 VND",
        numLike: 10,
        liked: false,
        cmts: [],
    },
    {
        user: {
            avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
            name: "Phạm C",
        },
        time: "4 ngày 3 đêm",
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
        title: "Du lịch cùng Phạm C",
        cost: "100.000 VND",
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
}));

export default function Feed(props) {

    // const [show, setShow] = useState(false);

    const classes = useStyles();



    return (
        <Container className={classes.container}>
            <div className={classes.content}>

                <div>
                    {
                        listPost.map((tour) => (
                            <Tour
                                tour={tour}
                            />
                        ))
                    }
                </div>

            </div>

        </Container>
    )
}
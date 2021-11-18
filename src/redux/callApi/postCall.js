import request from '../../utils/fetchData';
import * as notifyAction from '../actions/notifyAction'
import * as postAction from '../actions/postAction';
import * as imageUtils from '../../utils/uploadImage';


export const getPosts = (data) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        const { type } = data;
        // call api to get post list
        const res = [
            {
                _id: 46794,
                user: {
                    _id: "3132",
                    userName: "huunguyen",
                    firstName: "A",
                    lastName: "Trần Văn",
                    avatarImage: "",
                },
                content: "Đây là lần đầu tôi post bài",
                time: "11/11/2021",
                comments: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    },
                    {
                        _id: 4654,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    }
                ],
                isPublic: 1,
                likes: [13133, 1313, 132132, 13],
                postImages: [
                    {
                        imageId: 1313,
                        url: "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                    },
                    {
                        imageId: 4654,
                        url: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                    }
                ],
                isPostReview: false,
                star: 0,
                cost: null,
                locationId: null,
                hashtags: ["#anuong", "#dulich"],
                taggedIds: [4656, 466, 1313],
                isPostService: false,
                provinceId: 3123,
            },
            {
                _id: 4465456,
                user: {
                    _id: "3132",
                    userName: "huunguyen",
                    firstName: "A",
                    lastName: "Trần Văn",
                    avatarImage: "",
                },
                content: "Đây là lần đầu tôi post bài",
                time: "11/11/2021",
                comments: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    },
                    {
                        _id: 4656,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    }
                ],
                isPublic: 1,
                likes: [13133, 1313, 132132, 13],
                postImages: [
                    {
                        imageId: 1313,
                        url: "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                    },
                    {
                        imageId: 4654,
                        url: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                    }
                ],
                isPostReview: false,
                star: 0,
                cost: null,
                locationId: null,
                hashtags: ["#bien", "#quangngai"],
                taggedIds: [4656, 466, 1313],
                isPostService: false,
                provinceId: 3123,
            },
            {
                _id: 78,
                user: {
                    _id: "3132",
                    userName: "huunguyen",
                    firstName: "A",
                    lastName: "Trần Văn",
                    avatarImage: "",
                },
                content: "Đây là lần đầu tôi post bài",
                time: "11/11/2021",
                comments: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    },
                    {
                        _id: 4656,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    }
                ],
                isPublic: 1,
                likes: [13133, 1313, 132132, 13],
                postImages: [
                    {
                        imageId: 1313,
                        url: "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                    },
                    {
                        imageId: 4654,
                        url: "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                    },
                    {
                        imageId: 4456,
                        url: "https://www.w3schools.com/howto/img_snow.jpg"
                    }
                ],
                isPostReview: false,
                star: 0,
                cost: null,
                locationId: null,
                hashtags: ["#bien", "#quangngai"],
                taggedIds: [4656, 466, 1313],
                isPostService: false,
                provinceId: 3123,
            },

        ];

        dispatch(postAction.getPosts({ posts: res }));
    }
    catch (err) {
        dispatch(postAction.error({ error: err }))
    }

}

export const createPost = (data) => async (dispatch) => {
    // post api
    dispatch(notifyAction.callStart());
    try {
        // call api to save post
        let image = [];
        if (data.image.length > 0) image = await imageUtils.uploadImages(data.image);

        // const res = await request.post("post", data);

        dispatch(notifyAction.callSuccess());

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const updatePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // call api to update post

        dispatch(notifyAction.callSuccess());

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const deletePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {


        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const likePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(postAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const unlikePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(postAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}
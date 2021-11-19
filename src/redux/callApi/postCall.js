import client from '../../utils/fetchData';
import * as notifyAction from '../actions/notifyAction'
import * as postAction from '../actions/postAction';
import * as imageUtils from '../../utils/uploadImage';


export const getPosts = (data) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        const { type } = data;
        console.log(type);
        // call api to get post list
        const res = [
            {
                _id: 46794,
                userId: {
                    _id: "3132",
                    userName: "huunguyen",
                    fullname: "Trần Văn A",
                    avatar: "",
                },
                content: "Đây là lần đầu tôi post bài",
                updatedAt: "11/11/2021",
                comments: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        updatedAt: "11/11/2021",
                        userId: {
                            _id: 54,
                            fullname: "huunguyen",
                            avatar: "",
                        },
                    },
                    {
                        _id: 4654,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        updatedAt: "11/11/2021",
                        userId: {
                            _id: 46465,
                            fullname: "huunguyen",
                            avatar: "",
                        },
                    }
                ],
                isPublic: 1,
                likes: [13133, 1313, 132132, 13],
                images: [

                    "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                    "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg",

                ],
                isPostReview: false,
                star: 0,
                cost: null,
                locationId: null,
                hashtags: [],
                taggedIds: [],
            },
            {
                _id: 4465456,
                userId: {
                    _id: "3132",
                    userName: "huunguyen",
                    fullname: "Nguyễn Văn B",
                    avatarImage: "",
                },
                content: "Đây là lần đầu tôi post bài",
                updatedAt: "11/11/2021",
                comments: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        updatedAt: "11/11/2021",
                        userId: {
                            _id: 7984654,
                            fullname: "huunguyen",
                            avatar: "",
                        },
                    },
                    {
                        _id: 4656,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        updatedAt: "11/11/2021",
                        userId: {
                            _id: 12313,
                            fullname: "huunguyen",
                            avatar: "",
                        },
                    }
                ],
                isPublic: 1,
                likes: [13133, 1313, 132132, 13],
                images: [
                    "https://toptour.com.vn/wp-content/uploads/2019/08/nhung-dia-diem-dep1.jpg",
                ],
                isPostReview: false,
                star: 0,
                cost: null,
                locationId: null,
                hashtags: ["#bien", "#quangngai"],
                taggedIds: [4656, 466, 1313]
            },

        ];

        dispatch(postAction.getPosts({ posts: res }));
    }
    catch (err) {
        dispatch(postAction.error({ error: err }))
    }

}

export const getMorePost = (data) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        const { type } = data;

        console.log(type);
        // call api to get more post
        const res = [];

        dispatch(postAction.getMorePost({ posts: res }));
    }
    catch (err) {
        dispatch(postAction.error({ error: err }));
    }
}

export const createPost = (data, token) => async (dispatch) => {
    // post api
    dispatch(notifyAction.callStart());
    try {
        // call api to save post
        let image = [];
        if (data.image.length > 0) image = await imageUtils.uploadImages(data.image);
        const post = {
            ...data,
            images: image
        }

        const request = client(token);
        const res = await request.post("post/create_post", post);
        console.log(res.data);
        dispatch(notifyAction.callSuccess({ message: res.data.message }));
        dispatch(postAction.addPost({ post: res.data.newPost }))

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.data.message }))
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
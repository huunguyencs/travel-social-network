import * as notifyAction from '../actions/notifyAction'
import * as postAction from '../actions/postAction';
import * as imageUtils from '../../utils/uploadImage';
import customAxios from '../../utils/fetchData';


export const getPosts = (token) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        // call api to get post list
        const res = await customAxios().get("post/posts");

        // console.log(res);

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {
        console.log(err);
        // dispatch(postAction.error({ error: err.response.data.message }))
    }

}

export const getPostsLocation = (id) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        const res = await customAxios().get(`/location/${id}/posts`);

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {
        dispatch(postAction.error({ error: err.response.data.message }))
    }
}

export const getUserPost = (id, token) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        const res = await customAxios(token).get(`/post/user_posts/${id}`);

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {

        // console.log(err.response.data.message);
        // console.log(err);
        dispatch(postAction.error({ error: err.response.data.message }))
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

export const createPost = (data, token, next) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    // post api
    try {
        // call api to save post
        let image = [];
        if (data.image.length > 0) image = await imageUtils.uploadImages(data.image);
        const post = {
            ...data,
            images: image
        }


        const res = await customAxios(token).post("/post/create_post", post);

        // console.log(res.data);
        dispatch(postAction.addPost({ post: res.data.newPost }))
        dispatch(notifyAction.callSuccess({ message: "" }));
        next();
    }
    catch (err) {
        console.log(err);
        dispatch(notifyAction.callFail({ error: err.response.data.message }))
    }
}

export const createReview = (data, token, next) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    // post api
    try {
        // call api to save post
        let image = [];
        if (data.image.length > 0) image = await imageUtils.uploadImages(data.image);
        const review = {
            ...data,
            images: image
        }


        const res = await customAxios(token).post("/post/create_review", review);

        // console.log(res.data);
        dispatch(postAction.addPost({ post: res.data.newPost }))
        dispatch(notifyAction.callSuccess({ message: "" }))
        next();
    }
    catch (err) {
        console.log(err);
        dispatch(notifyAction.callFail({ err: err.response.data.message }));
    }
}

export const updatePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // call api to update post

        dispatch(notifyAction.callSuccess());

    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }))
    }
}

export const deletePost = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {


        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }))
    }
}

export const likePost = (id, token, next) => async (dispatch) => {

    try {
        const res = await customAxios(token).patch(`/post/${id}/like`);
        dispatch(postAction.updateLike({ id: id, likes: res.data.likes }));
    }
    catch (err) {
        next();
        // console.log(err);
    }
}

export const unlikePost = (id, token, next) => async (dispatch) => {

    try {
        const res = await customAxios(token).patch(`/post/${id}/unlike`);
        dispatch(postAction.updateLike({ id: id, likes: res.data.likes }));
    }
    catch (err) {
        next();
        // console.log(err);
    }
}
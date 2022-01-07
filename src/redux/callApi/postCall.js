// import * as notifyAction from '../actions/notifyAction'
import * as postAction from '../actions/postAction';
import * as tourAction from '../actions/tourAction';
import * as imageUtils from '../../utils/uploadImage';
import customAxios from '../../utils/fetchData';


export const getPosts = (token) => async (dispatch) => {
    dispatch(postAction.getPosts({ posts: [] }));
    dispatch(postAction.loading());

    try {
        // call api to get post list
        const res = await customAxios().get("post/posts");

        // console.log(res);

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {
        // console.log(err);
        dispatch(postAction.error({ error: "Lỗi" }))
    }

}

export const getPostsLocation = (id) => async (dispatch) => {
    dispatch(postAction.getPosts({ posts: [] }));
    dispatch(postAction.loading());

    try {
        const res = await customAxios().get(`/location/${id}/posts`);

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {
        dispatch(postAction.error({ error: "Lỗi" }))
    }
}

export const getUserPost = (id, token) => async (dispatch) => {
    dispatch(postAction.getPosts({ posts: [] }));
    dispatch(postAction.loading());

    try {
        const res = await customAxios(token).get(`/post/user_posts/${id}`);

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {

        // console.log(err.response.data.message);
        // console.log(err);
        dispatch(postAction.error({ error: "Lỗi" }))
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
        dispatch(postAction.error({ error: "Lỗi" }));
    }
}

export const getPostById = (id, next) => async (dispatch) => {
    dispatch(postAction.getPosts({ posts: [] }));
    try {
        await customAxios().get(`/post/${id}`).then(res => {
            dispatch(postAction.getPosts({ posts: [res.data.post] }));
        }).catch(err => {
            if (err.response.status === 404) {
                next();
            }
        })

    }
    catch (err) {
        // console.log(err);
        dispatch(postAction.error({ error: "Lỗi" }))
    }

}

export const createPost = (data, token, type, next, error) => async (dispatch) => {
    // post api
    try {

        let image = [];
        if (data.images.length > 0) image = await imageUtils.uploadImages(data.images);
        const post = {
            ...data,
            images: image
        }
        var url = ""
        if (type === "review") {
            url = "/post/create_review"
        }
        else {
            url = "/post/create_post"
        }
        // call api to save post

        const res = await customAxios(token).post(url, post);

        // console.log(res.data);
        dispatch(postAction.addPost({ post: res.data.newPost }))
        next();
    }
    catch (err) {
        error();
    }
}

export const updatePost = (data, token, next, error) => async (dispatch) => {

    try {
        // call api to update post

        let oldImages = data.images.filter(item => typeof item === 'string')
        let newImages = data.images.filter(item => typeof item !== 'string')
        let images = [];
        if (newImages.length > 0) {
            images = await imageUtils.uploadImages(newImages);
        }
        images = [...oldImages, ...images]
        const post = {
            ...data,
            images: images
        }

        const res = await customAxios(token).patch(`/post/${data.id}`, post);

        dispatch(postAction.updatePost({ post: res.data.post }))
        next();
    }
    catch (err) {
        error();
    }
}


export const deletePost = (id, token, next) => async (dispatch) => {

    try {
        await customAxios(token).delete(`/post/${id}`);
        dispatch(postAction.deletePost({ id: id }));
        next();
    }
    catch (err) {

    }
}

export const likePost = (id, token, socket, next) => async (dispatch) => {

    try {
        const res = await customAxios(token).patch(`/post/${id}/like`);
        dispatch(postAction.updateLike({ id: id, likes: res.data.likes }));
        socket.emit('like', { type: 'post', id, likes: res.data.likes });
    }
    catch (err) {
        next();
        // console.log(err);
    }
}

export const unlikePost = (id, token, socket, next) => async (dispatch) => {

    try {
        const res = await customAxios(token).patch(`/post/${id}/unlike`);
        dispatch(postAction.updateLike({ id: id, likes: res.data.likes }));
        socket.emit('unlike', { type: 'post', id, likes: res.data.likes });
    }
    catch (err) {
        next();
        // console.log(err);
    }
}

export const share = (type, token, shareId, content, hashtags, next, error) => async (dispatch) => {
    try {
        const res = await customAxios(token).post(`/${type}/share`, {
            shareId: shareId,
            content: content,
            hashtags: hashtags
        })
        next();

        if (type === "post") {
            dispatch(postAction.addPost({ post: res.data.newPost }))
        }
        else if (type === "tour") {
            dispatch(tourAction.addTour({ tour: res.data.newTour }))
        }
    }
    catch (err) {
        error();
    }
}

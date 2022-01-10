import * as postAction from '../actions/postAction';
import * as tourAction from '../actions/tourAction';
import * as imageUtils from '../../utils/uploadImage';
import customAxios from '../../utils/fetchData';
import * as alertAction from '../actions/alertAction';


export const getPosts = (token) => async (dispatch) => {
    // dispatch(postAction.getPosts({ posts: [] }));
    dispatch(postAction.loading());

    try {
        // call api to get post list
        const res = await customAxios().get("/post/posts");

        // console.log(res);

        // console.log(res.data.posts)

        dispatch(postAction.getPosts({ posts: res.data.posts }));
    }
    catch (err) {
        // console.log(err);
        dispatch(postAction.error({ error: "Có lỗi xảy ra" }))
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
        dispatch(postAction.error({ error: "Có lỗi xảy ra" }))
    }
}

export const getUserPost = (id, token, offset) => async (dispatch) => {
    // dispatch(postAction.getPosts({ posts: [] }));
    dispatch(postAction.loading());

    try {
        const res = await customAxios(token).get(`/post/user_posts/${id}`, {
            offset: offset
        });

        // console.log(res.data.posts);
        if (offset > 0) {

            dispatch(postAction.getMorePost({ posts: res.data.posts }));
        }
        else {
            dispatch(postAction.getPosts({ posts: res.data.posts }));
        }

    }
    catch (err) {

        // console.log(err.response.data.message);
        // console.log(err);
        dispatch(postAction.error({ error: "Có lỗi xảy ra" }))
    }
}

export const getMorePost = (data) => async (dispatch) => {
    dispatch(postAction.loading());

    try {
        // const { type } = data;

        // console.log(type);
        // call api to get more post
        const res = [];

        dispatch(postAction.getMorePost({ posts: res }));
    }
    catch (err) {
        dispatch(postAction.error({ error: "Có lỗi xảy ra" }));
    }
}

export const getPostById = (id, next) => async (dispatch) => {
    dispatch(postAction.getPosts({ posts: [] }));
    dispatch(postAction.loading());
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
        dispatch(postAction.error({ error: "Có lỗi xảy ra" }))
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

        dispatch(postAction.updatePost({ post: res.data.post }));
        dispatch(alertAction.success({ message: "Cập nhật thành công!" }))
        next();
    }
    catch (err) {
        error();
    }
}


export const deletePost = (id, token, next, error) => async (dispatch) => {

    try {
        await customAxios(token).delete(`/post/${id}`);
        dispatch(postAction.deletePost({ id: id }));
        next();
    }
    catch (err) {
        error();
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
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
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
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
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
        dispatch(alertAction.success({ message: "Chia sẻ thành công!" }))
    }
    catch (err) {
        error();
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

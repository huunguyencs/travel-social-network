import * as tourAction from '../actions/tourAction';
import * as notifyAction from '../actions/notifyAction';
import customAxios from '../../utils/fetchData';
import * as imageUtils from '../../utils/uploadImage'

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {
        // call api to get tours
        const res = [
            {
                _id: 32123,
                userId: {
                    _id: "3132",
                    userName: "huunguyen",
                    fullname: "Trần A",
                    avatar: "",
                },
                tourDate: [1465, 1324, 1313],
                tourName: "Đây là tên của tour",
                isPublic: true,
                updatedAt: "11/11/2021",
                content: "Cùng khám phá Hà Nội",
                hashtags: ["#dulich", '#bien'],
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                taggedIds: [13221, 1654, 131],
                likeIds: [132, 132456, 132],
                comment: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        updatedAt: "13/11/2021",
                        userId: {
                            _id: 79,
                            fullname: "huunguyen",
                            avatar: "",
                        },
                    },
                ]
            },
            {
                _id: 1346,
                userId: {
                    _id: "3132",
                    userName: "huunguyen",
                    fullname: "Trần Văn A",
                    avatar: "",
                },
                tourDate: [1465, 1324, 1313],
                tourName: "Đây là tên của tour",
                content: "Cùng khám phá Hà Nội",
                hashtags: ["#dulich", '#bien'],
                image: "",
                updatedAt: "11/11/2021",
                isPublic: true,
                taggedIds: [13221, 1654, 131],
                likeIds: [132, 132456, 132],
                comment: [
                    {
                        _id: 46546,
                        likes: [46, 461, 134],
                        content: "Đây là nội dung của comment",
                        updatedAt: "13/11/2021",
                        userId: {
                            fullname: "huunguyen",
                            avatar: "",
                        },
                    },
                ]
            }
        ];

        dispatch(tourAction.getTours({ tour: res }));
    }
    catch (err) {
        dispatch(tourAction.error({ error: err.response.data.message }))
    }
}

export const getTourDetail = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {
        const res = {
            _id: 1321,
            tourName: "Đây là tiêu đề của tour",
            tourDate: [
                {
                    _id: 3123,
                    date: "12/11/2021",
                    locations: [
                        {
                            _id: 2514,
                            location: {
                                _id: 1313,
                                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                                locationName: "Chùa Một Cột",
                                province: {
                                    _id: 45456,
                                    name: "Hà Nội"
                                }
                            },
                            cost: 200,
                            postId: 221,
                        },
                        {
                            _id: 525,
                            location: {
                                _id: 1313,
                                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                                locationName: "Chùa Một Cột",
                                province: {
                                    _id: 45456,
                                    name: "Hà Nội"
                                }
                            },
                            cost: 200,
                            postId: 221,
                        }
                    ]
                },
                {
                    _id: 789,
                    date: "13/11/2021",
                    locations: [
                        {
                            _id: 2514,
                            location: {
                                _id: 1313,
                                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                                locationName: "Chùa Một Cột",
                                province: {
                                    _id: 45456,
                                    name: "Hà Nội"
                                }
                            },
                            cost: 200,
                            postId: 221,
                        },
                    ]
                }
            ],
            content: "Cùng khám phá Hà Nội",
            hashtags: ["#dulich", '#bien'],
            isPublic: true,
            taggedIds: [],
            likeIds: [],
            comment: [],
            user: {
                _id: "3132",
                userName: "huunguyen",
                firstName: "A",
                lastName: "Trần Văn",
                avatarImage: "",
            },
        };
        dispatch(tourAction.getTourDetail({ tourdetail: res }));
    }
    catch (err) {
        dispatch(tourAction.error({ error: err.response.data.message }));
    }
}

export const updateTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // 
        const res = 0;

        dispatch(tourAction.updateTour({ tour: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}



export const createTourCall = (tour, image, token) => async (dispatch) => {

    dispatch(notifyAction.callStart());

    try {
        // call api to save tour
        let imageUpload = [];
        if (image) imageUpload = await imageUtils.uploadImages([image]);
        const data = {
            ...tour,
            images: imageUpload[0]
        }

        const res = await customAxios(token).post('tour/create_tour', data);
        console.log(res);

        // const res = 0;

        // dispatch(tourAction.createTour({ tour: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }))
    }
}

export const deleteTour = (data) => async (dispatch) => {
    try {
        // call api to delete tour
        dispatch(tourAction.deleteTour());
    }
    catch (err) {
        dispatch(tourAction.error({ error: err.response.data.message }));
    }
}

export const likeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}

export const unlikeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err.response.data.message }));
    }
}
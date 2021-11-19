import * as tourAction from '../actions/tourAction';
import * as notifyAction from '../actions/notifyAction';

export const getTours = (data) => async (dispatch) => {
    dispatch(tourAction.loading());
    try {
        // call api to get tours
        const res = [
            {
                _id: 32123,
                user: {
                    _id: "3132",
                    userName: "huunguyen",
                    firstName: "A",
                    lastName: "Trần Văn",
                    avatarImage: "",
                },
                tourDate: [1465, 1324, 1313],
                tourName: "Đây là tên của tour",
                isPublic: true,
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
                        time: "13/11/2021",
                        user: {
                            userName: "huunguyen",
                            avatarImage: "",
                        },
                    },
                ]
            },
            {
                _id: 1346,
                user: {
                    _id: "3132",
                    userName: "huunguyen",
                    firstName: "A",
                    lastName: "Trần Văn",
                    avatarImage: "",
                },
                tourDate: [1465, 1324, 1313],
                tourName: "Đây là tên của tour",
                content: "Cùng khám phá Hà Nội",
                hashtags: ["#dulich", '#bien'],
                image: "",
                isPublic: true,
                taggedIds: [13221, 1654, 131],
                likeIds: [132, 132456, 132],
                comment: [
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
                ]
            }
        ];

        dispatch(tourAction.getTours({ tour: res }));
    }
    catch (err) {
        dispatch(tourAction.error({ error: err }))
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
        dispatch(tourAction.error({ error: err }));
    }
}

export const updateTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());
    try {
        // 
        const res = 0;

        dispatch(tourAction.updateTour({ tour: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}



export const createTour = (data) => async (dispatch) => {

    dispatch(notifyAction.callStart());

    try {
        // call api to save tour

        const res = 0;

        dispatch(tourAction.createTour({ tour: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }))
    }
}

export const deleteTour = (data) => async (dispatch) => {
    try {
        // call api to delete tour
        dispatch(tourAction.deleteTour());
    }
    catch (err) {
        dispatch(tourAction.error({ error: err }));
    }
}

export const likeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}

export const unlikeTour = (data) => async (dispatch) => {
    dispatch(notifyAction.callStart());

    try {

        const res = 0;
        dispatch(tourAction.updateLike({ like: res }));
        dispatch(notifyAction.callSuccess());
    }
    catch (err) {
        dispatch(notifyAction.callFail({ error: err }));
    }
}
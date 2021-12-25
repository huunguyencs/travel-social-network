import * as locationActions from '../actions/locationAction';
import * as notifyActions from '../actions/notifyAction';
import customAxios from '../../utils/fetchData';

export const getProvinces = (data) => async (dispatch) => {
    dispatch(notifyActions.callStart());
    try {
        const res = await customAxios().get('province/provinces');
        dispatch(locationActions.getProvinces({ provinces: res.data.provinces }));
        dispatch(notifyActions.callSuccess({ message: "" }))
    }
    catch (err) {
        dispatch(notifyActions.callFail({ error: err }))
    }
}

export const getLocationHot = (data) => async (dispatch) => {
    dispatch(locationActions.loading());

    try {
        const res = [
            {
                _id: 1,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Chùa Một Cột",
                rate: 5,
            },
            {
                _id: 2,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Đền Hùng",
                rate: 5,
            },
            {
                _id: 3,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Lăng Chủ tịch",
                rate: 4,
            },
            {
                _id: 4,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Vịnh Hạ Long",
                rate: 5
            }
        ];
        dispatch(locationActions.getLocationHot({ hot: res }));
    }
    catch (err) {
        dispatch(locationActions.error({ error: err.response.data.message }));
    }
}